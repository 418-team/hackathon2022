const [listParams, listHandler] = require('./list');
const [createParams, createHandler] = require('./create');
const [deleteParams, deleteHandler] = require('./delete');
const [meParams, meHandler] = require('./me');

module.exports = (fastify, ctx, done) => {
    fastify.get('/users/list', listParams, listHandler);
    fastify.post('/users/create', createParams, createHandler);
    fastify.post('/users/me', meParams, meHandler);
    fastify.delete('/users/delete/:id', deleteParams, deleteHandler);
    fastify.register(require('./edit'));
    done();
};