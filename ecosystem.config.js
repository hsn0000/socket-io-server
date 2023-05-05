module.exports = {
    apps: [{
        name: 'socket-express-io',
        script: './server.js',
        time: true,
        restart_delay: 1000,
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        watch: '.',
        ignore_watch: ['node_modules', 'logs'],
        env: {
            NODE_ENV: 'development'
        }
    }]
};