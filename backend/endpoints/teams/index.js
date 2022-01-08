const [listParams, listHandler] = require("./list");
const [createParams, createHandler] = require("./create");
const [deleteParams, deleteHandler] = require("./delete");
const [myParams, myHandler] = require("./my");

module.exports = (fastify, ctx, done) => {
  fastify.get("/teams/list", listParams, listHandler);
  fastify.post("/teams/create", createParams, createHandler);
  fastify.delete("/teams/delete/:id", deleteParams, deleteHandler);
  fastify.get("/teams/my", myParams, myHandler);
  done();
};
