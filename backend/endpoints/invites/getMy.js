async function handler(req) {
  const data = await req.pg.query(
    "SELECT id, team_id, message FROM invites WHERE user_id=$1",
    [req.jwt.uid]
  ).rows;
  return Promise.resolve({ statusCode: 200, data });
}

const params = {
  schema: {
    tags: ["invites"],
    summary: "Получить данные о своих приглашениях",
    security: [{ OAuth2: ["user"] }],
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          data: {
            type: "array",
            properties: {
              id: { type: "integer" },
              team_id: { type: "integer" },
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
};

module.exports = [params, handler];
