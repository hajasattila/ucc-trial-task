export default [
    {
        method: 'POST',
        path: '/custom/send-reset-email',
        handler: 'api::custom.custom.sendResetEmail',
        config: { auth: false },
    },
    {
        method: 'POST',
        path: '/custom/reset-password',
        handler: 'api::custom.custom.resetPassword',
        config: { auth: false },
    },
];
