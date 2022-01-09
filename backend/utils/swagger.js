const SwaggerPlugin = require("fastify-swagger");

function swagger(fastify) {
  const config = {
    routePrefix: "/docs",
    exposeRoute: true,
    swagger: {
      info: {
        title: "418 Hackathon API",
        version: process.env.VERSION || "local",
      },
      host: "127.0.0.1:14400",
      schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "teams", description: "Методы для работы с командами" },
        { name: "invites", description: "Методы для работы с приглашениями" },
        { name: "events", description: "Методы для работы с событиями" },
        { name: "skills", description: "Методы для работы со скиллами" },
        { name: "users", description: "Методы для работы с пользователями" },
        { name: "oauth", description: "Методы для авторизации OAuth2" },
      ],
      securityDefinitions: {
        OAuth2: {
          type: "oauth2",
          flow: "password",
          tokenUrl: "/oauth/authorize",
          refreshUrl: "/oauth/refresh",
        },
      },
    },
  };

  fastify.register(SwaggerPlugin, config);

  fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
  });
}

module.exports = swagger;
