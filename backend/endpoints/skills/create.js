const SQL = `
    INSERT INTO skills (title)
    VALUES ($1)
    RETURNING id
`;

async function handler(req) {
  const b = req.body;

  const result = (await req.pg.query(SQL, [b.title])).rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["skills"],
    summary: "Создать навык",
    security: [{ OAuth2: ["user"] }],
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
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
