const [createInvites, createHandler] = require("./create");
const [listInvites, listHandler] = require("./getMy");
const [rejectInvites, rejectHandler] = require("./reject");

module.exports = (fastify, ctx, done) => {
  fastify.post("/invites/create", createInvites, createHandler);
  fastify.get("/invites/getMy", listInvites, listHandler);
  fastify.delete("/invites/reject/:id", rejectInvites, rejectHandler);
  done();
};
