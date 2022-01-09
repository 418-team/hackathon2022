const [listParams, listHandler] = require("./list");

module.exports = (fastify, ctx, done) => {
  fastify.get("/skills/list", listParams, listHandler);
  done();
};
