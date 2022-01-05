const [createEvent, createHandler] = require('./create');
const [listEvent, listHandler] = require('./list');

module.exports = (fastify, ctx, done) => {
    fastify.post('/events/create', createEvent, createHandler);
    fastify.get('/events/list', listEvent, listHandler)
    fastify.register(require('./edit'));
    done();
};
