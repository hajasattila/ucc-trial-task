export default {
    routes: [
        {
            method: 'GET',
            path: '/event',
            handler: 'event.find',
        },
        {
            method: 'POST',
            path: '/event',
            handler: 'event.create',
        },
        {
            method: 'PUT',
            path: '/event/:id',
            handler: 'event.update',
        },
        {
            method: 'DELETE',
            path: '/event/:id',
            handler: 'event.delete',
        },
        {
            method: 'PUT',
            path: '/auth/change-password',
            handler: 'event.changePassword',
            config: {
                auth: {
                    strategies: ['users-permissions']
                }
            }
        }
    ]
};
