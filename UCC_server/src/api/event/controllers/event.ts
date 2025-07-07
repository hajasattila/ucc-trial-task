import {factories} from '@strapi/strapi';

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

            const updated = await strapi.entityService.update('api::event.event', id, {
                data,
            });

            return ctx.send({message: 'Event updated', updated});
        } catch (err) {
            console.error('Hiba módosítás közben:', err);
            return ctx.badRequest('Módosítás nem sikerült');
        }
    }
}));
