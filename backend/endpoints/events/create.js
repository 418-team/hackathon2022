const SQL = `
    INSERT INTO events (user_id, title, description, date_start, date_end, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
`;

async function handler(req) {
  const { uid: user_id } = req.jwt;
  const b = req.body;
  const result = (
    await req.pg.query(SQL, [
      user_id,
      b.title,
      b.description,
      b.date_start,
      b.date_end,
      b.location,
    ])
  ).rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["events"],
    summary: "Создать событие",
    security: [{ OAuth2: ["user"] }],
    body: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        title: { type: "string" },
        description: { type: "string" },
        date_start: { type: "string" },
        date_end: { type: "string" },
        location: { type: "string" },
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
