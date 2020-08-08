const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4000,
        dbUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fyce0.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
        cookieSecret: process.env.COOKIE_SECRET,
        jwtSecret: process.env.JWT_SECRET,
        saltRounds: Number(process.env.SALT_ROUNDS),
        sendGridApiKey: process.env.SENDGRID_API_KEY
    },
    production: {
        port: process.env.PORT || 4000,
        dbUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fyce0.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
        cookieSecret: process.env.COOKIE_SECRET,
        jwtSecret: process.env.JWT_SECRET,
        saltRounds: Number(process.env.SALT_ROUNDS),
        sendGridApiKey: process.env.SENDGRID_API_KEY
    }
}

module.exports = config[env];