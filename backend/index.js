require("./utils/envValidate");

const logger = require("./utils/logger");
// eslint-disable-next-line import/order
const fastify = require("fastify")({ logger });
const setupSwagger = require("./utils/swagger");

setupSwagger(fastify);

const pgConnector = require("./utils/pgConnector");
const { AuthCheck } = require("./utils/security");

pgConnector.initDB();

fastify.register(require("fastify-cors"), {
  origin: (origin, callback) => {
    callback(null, true);
  },
});

fastify.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }
);

fastify.register(require("fastify-formbody"));

fastify.addHook("preHandler", (request, reply, done) => {
  request.pg = pgConnector;
  done();
});

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.addHook("preHandler", AuthCheck);
fastify.register(require("./endpoints/oauth"));
fastify.register(require("./endpoints/users"));
fastify.register(require("./endpoints/teams"));
fastify.register(require("./endpoints/invites"));
fastify.register(require("./endpoints/skills"));
// fastify.register(require('./endpoints/tags'));
// fastify.register(require('./endpoints/units'));
// fastify.register(require('./endpoints/tasks'));
// fastify.register(require('./endpoints/checkups'));

const start = async () => {
  try {
    await fastify.listen(80, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
