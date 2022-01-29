const [listParams, listHandler] = require("./list");
const [createParams, createHandler] = require("./create");

module.exports = (fastify, ctx, done) => {
  fastify.get("/skills/list", listParams, listHandler);
  fastify.post("/skills/create", createParams, createHandler);
  done();
};
