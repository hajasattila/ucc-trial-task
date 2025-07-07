import { factories } from '@strapi/strapi';

const knowledgeBase: { keywords: string[]; answer: string }[] = [
    {
        keywords: ['nyitvatartás', 'mikor vagytok nyitva'],
        answer: 'Nyitvatartásunk: H-P 8:00 - 16:00.'
    },
    {
        keywords: ['ár', 'mennyibe kerül'],
        answer: 'A szolgáltatásaink árai itt találhatók: https://pelda.hu/araink'
    },
    {
        keywords: ['ember', 'ügynök', 'operator'],
        answer: 'Rendben, emberi segítséget kérsz. Továbbítjuk! 👤'
    }
];

function getBotReply(text: string): string {
    for (const item of knowledgeBase) {
        if (item.keywords.some((kw) => text.includes(kw))) {
            return item.answer;
        }
    }
    return 'Sajnálom, nem értem pontosan. Kérlek, fogalmazd át!';
}

export default factories.createCoreController('api::chat-message.chat-message', ({ strapi }) => ({
    async create(ctx) {
        const { data } = ctx.request.body;
        const messageText = data.message?.toLowerCase() || '';
        const userId = ctx.state.user?.id;

        if (!userId) return ctx.unauthorized('Felhasználó nem hitelesített');

        const isHumanRequested = messageText.includes('operator') || messageText.includes('ember') || messageText.includes('human');

        const createdMessage = await strapi.entityService.create('api::chat-message.chat-message', {
            data: {
                message: data.message,
                statusEnum: 'answered',
                isHumanRequested,
                users_permissions_user: userId,
                toUser: data.toUser || null
            },
        });

        const botReply = getBotReply(messageText);

        if (botReply) {
            await strapi.entityService.create('api::chat-message.chat-message', {
                data: {
                    message: botReply,
                    statusEnum: 'answered',
                    isHumanRequested: false,
                    users_permissions_user: userId,
                    toUser: userId
                },
            });
        }

        return ctx.send({ data: createdMessage });
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;
        const userId = ctx.state.user?.id;
        const isAgent = ctx.state.user?.isAgent === true;

        const existing = await strapi.entityService.findOne('api::chat-message.chat-message', id, {
            populate: ['users_permissions_user'],
        }) as any;

        if (!existing) {
            return ctx.notFound('Üzenet nem található');
        }

        if (!isAgent && existing.users_permissions_user?.id !== userId) {
            return ctx.unauthorized('Nincs jogosultság módosítani ezt az üzenetet');
        }

        const updated = await strapi.entityService.update('api::chat-message.chat-message', id, {
            data,
            populate: ['users_permissions_user'],
        });

        return ctx.send({ data: updated });
    },

    async find(ctx) {
        const user = ctx.state.user;
        const isAgent = user?.isAgent === true;

        const filters = isAgent
            ? { isHumanRequested: true }
            : {
                $or: [
                    { users_permissions_user: user?.id },
                    { toUser: user?.id }
                ]
            };

        const messages = await strapi.entityService.findMany('api::chat-message.chat-message', {
            filters,
            populate: ['users_permissions_user', 'toUser'],
            sort: ['createdAt:asc'],
        });

        return ctx.send({ data: messages });
    }


}));
