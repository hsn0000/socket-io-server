const envFile = require('dotenv').config('.env');

module.exports = {
    conn: {
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5433
    },    
    conn2:{
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 6432,
        // port: 5432,
        max: 1000,
        idleTimeoutMillis: 1000,
        connectionTimeoutMillis: 2000,
    },
    redis:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
    redisMaster:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
    serverSocket:process.env.URL_SOCKET_SERVER,
    clientSocket:process.env.URL_SOCKET_CLIENT,
    APP_ENV:process.env.APP_ENV,
    APP_GAME:process.env.APP_GAME,
    GAME_PORT:process.env.GAME_PORT,
    GAME_CODE:process.env.GAME_CODE,
    CERT_PATH:process.env.CERT_PATH,
}