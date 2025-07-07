import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
    async delete(ctx) {
        try {
            const { id } = ctx.params;

            const deleted = await strapi.entityService.delete('api::event.event', id);

            return ctx.send({ message: 'Event deleted', deleted });
        } catch (err) {
            console.error('Hiba törlés közben:', err);
            return ctx.badRequest('Törlés nem sikerült');
        }
    }
}));
