require('dotenv').config();

module.exports = {
    api: {
        port: process.env.API_PORT
    },
    post: {
        port: process.env.POST_PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT,
    },
}