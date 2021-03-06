const SQL = `
  DELETE FROM invites WHERE id=$1 RETURNING id
`;

async function handler(req) {
  const p = req.params;

  const user = (
    await req.pg.query("SELECT id FROM invites WHERE id=$1", [p.id])
  ).rows[0];
  if (!user)
    return Promise.reject({
      statusCode: 400,
      error: "already_exists",
      message: "Приглашения с таким id не существует",
    });

  const result = (await req.pg.query(SQL, [p.id])).rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["invites"],
    summary: "Отклонить приглашение",
    security: [{ OAuth2: ["user"] }],
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          id: { type: "integer" },
        },
      },
    },
  },
};

module.exports = [params, handler];
