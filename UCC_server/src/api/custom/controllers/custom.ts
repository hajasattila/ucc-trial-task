import { Context } from 'koa';
import crypto from 'crypto';

const customController = {
    async sendResetEmail(ctx: Context) {
        const { email } = ctx.request.body;
        if (!email) return ctx.badRequest('Email required');

        const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { email } });
        if (!user) return ctx.send({ ok: true });

        const resetToken = crypto.randomBytes(32).toString('hex');
        await strapi.db.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: { resetPasswordToken: resetToken },
        });

        const resetUrl = `http://localhost:4200/reset-password?code=${resetToken}`;
        await strapi.plugin('email').service('email').send({
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        ctx.send({ ok: true });
    },

    async resetPassword(ctx: Context) {
        const { code, password } = ctx.request.body;
        const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { resetPasswordToken: code } });
        if (!user) return ctx.badRequest('Invalid or expired code');

        const hashedPassword = await strapi.plugin('users-permissions').service('user').hashPassword(password);

        await strapi.db.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: { password: hashedPassword, resetPasswordToken: null },
        });

        ctx.send({ ok: true });
    },
};

export default customController;
