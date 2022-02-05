async function handler(req) {
  const data = (
    await req.pg.query(
      "SELECT id, email, first_name, last_name, patronymic, specialization, avarat, scopes FROM users WHERE id=$1",
      [req.jwt.uid]
    )
  ).rows[0];
  return Promise.resolve({ statusCode: 200, data });
}

const params = {
  schema: {
    tags: ["users"],
    summary: "Получить данные о своём аккаунте",
    security: [{ OAuth2: ["user"] }],
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          data: {
            type: "object",
            properties: {
              id: { type: "integer" },
              email: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              patronymic: { type: "string" },
              specialization: { type: "string" },
              avatar_url: {type: "string"},
              scopes: { type: "array" },
            },
          },
        },
      },
    },
  },
};

module.exports = [params, handler];
