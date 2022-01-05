const [createEvent, createHandler] = require('./create');
const [listEvent, listHandler] = require('./list');
const [getEvent, getHandler] = require('./edit/info');

module.exports = (fastify, ctx, done) => {
    fastify.post('/events/create', createEvent, createHandler);
    fastify.get('/events/list', listEvent, listHandler)
    fastify.get('/events/:id', getEvent, getHandler)
    done();
};
