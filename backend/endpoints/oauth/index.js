const [authorizeParams, authorizeHandler] = require("./authorize");
const [refreshParams, refreshHandler] = require("./refresh");
const [registrationParams, registrationHandler] = require("./registration");

module.exports = (fastify, ctx, done) => {
  fastify.post("/oauth/authorize", authorizeParams, authorizeHandler);
  fastify.post("/oauth/refresh", refreshParams, refreshHandler);
  fastify.post("/oauth/registration", registrationParams, registrationHandler);
  done();
};
