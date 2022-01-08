async function handler(req) {
  const data = (
    await req.pg.query(
      "SELECT id, title, description FROM teams WHERE admin_id=$1",
      [req.jwt.uid]
    )
  ).rows[0];
  return Promise.resolve({ statusCode: 200, data });
}

const params = {
  schema: {
    tags: ["teams"],
    summary: "Получить данные о своей команды",
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
              title: { type: "string" },
              description: { type: "string" },
            },
          },
        },
      },
    },
  },
};

module.exports = [params, handler];
