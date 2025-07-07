import {factories} from '@strapi/strapi';
import * as bcrypt from 'bcryptjs';

export default factories.createCoreController('api::event.event', ({strapi}) => ({

    async delete(ctx) {
        try {
            const {id} = ctx.params;
            const deleted = await strapi.entityService.delete('api::event.event', id);
            return ctx.send({message: 'Event deleted', deleted});
        } catch (err) {
            console.error('Hiba törlés közben:', err);
            return ctx.badRequest('Törlés nem sikerült');
        }
    },

    async update(ctx) {
        try {
            const {id} = ctx.params;
            const {data} = ctx.request.body;
            const updated = await strapi.entityService.update('api::event.event', id, {data});
            return ctx.send({message: 'Event updated', updated});
        } catch (err) {
            console.error('Hiba módosítás közben:', err);
            return ctx.badRequest('Módosítás nem sikerült');
        }
    },

    async changePassword(ctx) {
        try {
            const userId = ctx.state.user?.id;
            const {password} = ctx.request.body;

            if (!userId) return ctx.unauthorized('Nincs bejelentkezett felhasználó');
            if (!password || password.length < 8) return ctx.badRequest('Gyenge jelszó');

            const hashedPassword = await bcrypt.hash(password, 10);

            const updated = await strapi.db.query('plugin::users-permissions.user').update({
                where: {id: userId},
                data: {password: hashedPassword},
            });

            return ctx.send({message: 'Jelszó frissítve', updated});
        } catch (err) {
            console.error('Jelszóváltás hiba:', err);
            return ctx.internalServerError('Hiba történt jelszó frissítéskor');
        }
    }


}));
