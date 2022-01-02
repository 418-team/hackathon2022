const SwaggerPlugin = require('fastify-swagger');

function swagger(fastify) {
    const config = {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Energy Check API',
                version: process.env.VERSION || 'local'
            },
            host: process.env.NODE_ENV === 'production' ? 'api.energy.418.one' : '94.41.65.26',
            schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {name: 'oauth', description: 'Методы для авторизации OAuth2'},
                {name: 'users', description: 'Методы для работы с пользователями'},
                {name: 'types', description: 'Методы для работы с типами юнитов'},
                {name: 'tags', description: 'Методы для работы с тегами'},
                {name: 'units', description: 'Методы для работы с юнитами (объектами)'},
                {name: 'tasks', description: 'Методы для работы с заданиями'},
                {name: 'checkups', description: 'Методы для работы с чекапами (проверки юнитов)'}
            ],
            securityDefinitions: {
                OAuth2: {
                    type: 'oauth2',
                    flow: 'password',
                    tokenUrl: '/oauth/authorize',
                    refreshUrl: '/oauth/refresh'
                }
            }
        }
    };


    fastify.register(SwaggerPlugin, config);

    fastify.ready(err => {
        if (err) throw err;
        fastify.swagger();
    });
}

module.exports = swagger;