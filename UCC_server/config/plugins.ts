module.exports = ({env}) => ({
    email: {
        provider: 'nodemailer',
        providerOptions: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hajasatlasz@gmail.com',
                pass: 'mzixlmhqejjbenrb',
            },
        },
        settings: {
            defaultFrom: 'hajasatlasz@gmail.com',
            defaultReplyTo: 'hajasatlasz@gmail.com',
        },
    },
});
