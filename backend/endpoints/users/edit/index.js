const [infoParams, infoHandler] = require("./info");
const [editParams, editHandler] = require("./edit");

module.exports = (fastify, ctx, done) => {
  fastify.get("/users/:id", infoParams, infoHandler);
  fastify.put("/users/:id", editParams, editHandler);
  done();
};
