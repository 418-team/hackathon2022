async function handler(req) {
  const { rows } = await req.pg.query(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.patronymic,
        (
            SELECT coalesce(json_agg(skl), '[]'::json)
            FROM (SELECT * FROM users_skills us left join skills s on s.id = us.skill_id WHERE us.user_id = u.id) skl
        ) "skills"
     FROM users u
        WHERE find_team=true ORDER BY id DESC`
  );
  return Promise.resolve({ statusCode: 200, rows });
}

const params = {
  schema: {
    tags: ["users"],
    summary: "Список пользователей доступный для всех пользователей",
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
                email: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                patronymic: { type: "string" },
                scopes: { type: "array" },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = [params, handler];
