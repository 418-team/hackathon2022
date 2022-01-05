const [listParams, listHandler] = require('./list');
const [createParams, createHandler] = require('./create');
const [meParams, meHandler] = require('./me');

module.exports = (fastify, ctx, done) => {
    fastify.get('/users/list', listParams, listHandler);
    fastify.post('/users/create', createParams, createHandler);
    fastify.post('/users/me', meParams, meHandler);
    done();
};