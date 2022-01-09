async function handler(req) {
  const { rows } = await req.pg.query(
    `SELECT *,
       (
           SELECT count(skills)
           FROM (SELECT * FROM users_skills us WHERE us.skill_id = s.id) skills
       ) "count"
        FROM skills s group by s.id order by count desc`
  );
  return Promise.resolve({ statusCode: 200, rows });
}

const params = {
  schema: {
    tags: ["skills"],
    summary: "Список скиллов",
    security: [{ OAuth2: ["user"] }],
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
