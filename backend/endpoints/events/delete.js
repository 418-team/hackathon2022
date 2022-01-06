const SQL = `
    DELETE FROM events WHERE id=$1 RETURNING id
`;

async function handler(req) {
  const p = req.params;

  const user = (await req.pg.query("SELECT id FROM events WHERE id=$1", [p.id]))
    .rows[0];
  if (!user)
    return Promise.reject({
      statusCode: 400,
      error: "already_exists",
      message: "Событие не существует",
    });

  const result = (await req.pg.query(SQL, [p.id])).rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["events"],
    summary: "Удалить событие",
    security: [{ OAuth2: ["admin"] }],
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
