async function handler(req) {
  const { rows } = await req.pg.query(`SELECT (
           SELECT coalesce(json_agg(pr), '[]'::json)
           FROM (SELECT * FROM participants p left join users u on u.id = p.user_id where p.team_id = t.id) pr
           ) "participants",
       * FROM teams t ORDER BY t.id DESC`);
  return Promise.resolve({ statusCode: 200, rows });
}

const params = {
  schema: {
    tags: ["teams"],
    summary: "Список команд",
    security: [{ OAuth2: ["admin"] }],
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          rows: {
            type: "array",
            additionalProperties: {
              type: "object",
              properties: {
                id: { type: "integer" },
                title: { type: "string" },
                description: { type: "string" },
                created_at: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = [params, handler];
