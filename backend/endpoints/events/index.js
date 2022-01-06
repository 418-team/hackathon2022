const [createEvent, createHandler] = require('./create');
const [listEvent, listHandler] = require('./list');
const [deleteEvent, deleteHandler] = require('./delete');

module.exports = (fastify, ctx, done) => {
    fastify.post('/events/create', createEvent, createHandler);
    fastify.get('/events/list', listEvent, listHandler)
    fastify.delete('/events/delete/:id', deleteEvent, deleteHandler)
    fastify.register(require('./edit'));
    done();
};
