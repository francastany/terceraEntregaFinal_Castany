export default {
    jwt: {
        token: process.env.JWT_TOKEN,
        cookie: process.env.JWT_COOKIE
    },
    mongo: {
        URL: process.env.MONGOURL
    },
    mailer: {
        GMAIL_USER: process.env.GMAIL_USER,
        GMAIL_PWD: process.env.GMAIL_PWD
    },
    app: {
        ADMIN_USER: process.env.SUPERADMIN_USER,
        ADMIN_PASSWORD: process.env.SUPERADMIN_PWD
    }
}