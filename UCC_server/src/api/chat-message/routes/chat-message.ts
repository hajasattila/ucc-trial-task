import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::chat-message.chat-message', {
    config: {
        find: { auth: { scope: ['plugin::users-permissions.user.me'] } },
        findOne: { auth: { scope: ['plugin::users-permissions.user.me'] } },
        create: { auth: { scope: ['plugin::users-permissions.user.me'] } },
        update: { auth: { scope: ['plugin::users-permissions.user.me'] } },
        delete: { auth: { scope: ['plugin::users-permissions.user.me'] } }
    }
});
