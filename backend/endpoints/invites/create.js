const SQL = `
  INSERT INTO invites (user_id, message, team_id)
  select $1, $2, t.id from teams t inner join participants p on p.id = $3
  where p.team_id = t.id
  RETURNING id
`;

async function handler(req) {
  const { uid: user_id } = req.jwt;
  const b = req.body;

  const result = (await req.pg.query(SQL, [b.user_id, b.message, user_id]))
    .rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["invites"],
    summary: "Создать приглашение",
    security: [{ OAuth2: ["user"] }],
    body: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        message: { type: "string" },
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
