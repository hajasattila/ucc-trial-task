export default {
    routes: [
        {
            method: 'GET',
            path: '/event',
            handler: 'event.find',
            config: { policies: [] },
        },
        {
            method: 'POST',
            path: '/event',
            handler: 'event.create',
            config: { policies: [] },
        },
        {
            method: 'PUT',
            path: '/event/:id',
            handler: 'event.update',
            config: { policies: [] },
        },
        {
            method: 'DELETE',
            path: '/event/:id',
            handler: 'event.delete',
            config: { policies: [] }
        }
    ],
};
