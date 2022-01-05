const [infoParams, infoHandler] = require('./info');
const [editParams, editHandler] = require('./edit');

module.exports = (fastify, ctx, done) => {
    fastify.get('/events/:id', infoParams, infoHandler);
    fastify.put('/events/:id', editParams, editHandler);
    done();
};