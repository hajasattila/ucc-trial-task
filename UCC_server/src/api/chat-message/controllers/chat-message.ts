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

        const isHumanRequested =
            messageText.includes('operator') ||
            messageText.includes('ember') ||
            messageText.includes('human');

        const createdMessage = await strapi.entityService.create('api::chat-message.chat-message', {
            data: {
                message: data.message,
                statusEnum: 'answered',
                isHumanRequested,
                users_permissions_user: userId,
            },
        });

        const botReply = getBotReply(messageText);

        const botMessage = await strapi.entityService.create('api::chat-message.chat-message', {
            data: {
                message: botReply,
                statusEnum: 'answered',
                isHumanRequested: false,
                users_permissions_user: userId,
            },
        });

        return ctx.send({ data: [createdMessage, botMessage] });
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;
        const userId = ctx.state.user?.id;

        const existing = await strapi.entityService.findOne('api::chat-message.chat-message', id, {
            populate: ['users_permissions_user'],
        }) as any;

        if (!existing || existing.users_permissions_user?.id !== userId) {
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

        const messages = await strapi.entityService.findMany('api::chat-message.chat-message', {
            filters: {
                users_permissions_user: user?.id,
            },
            populate: ['users_permissions_user'],
            sort: ['createdAt:asc'],
        });

        return ctx.send({ data: messages });
    },

}));
