async function handler(req) {
  const data = await req.pg.query(
    `SELECT
       json_build_object('profile', u) profile,
    (
        SELECT coalesce(json_agg(inv), '[]'::json)
        FROM (SELECT i.id, i.team_id, t3.title, i.message FROM invites i left join teams t3 on t3.id = i.team_id WHERE i.user_id = u.id) inv
    ) "invites",
   (
       SELECT coalesce(json_agg(skl), '[]'::json)
       FROM (SELECT * FROM users_skills us left join skills s on s.id = us.skill_id WHERE us.user_id = u.id) skl
   ) "skills",
    (
        SELECT coalesce(json_agg(t2), '[]'::json)
        FROM (
            SELECT
                t.id,
                t.title,
                t.description,
                t.admin_id,
                t.invite_code,
                (
                    SELECT coalesce(json_agg(p3), '[]'::json)
                    FROM (
                        SELECT u2.id, u2.first_name, u2.email, u2.last_name, u2.avatar_url,
                        (
                            SELECT coalesce(json_agg(skl1), '[]'::json)
                            FROM (SELECT * FROM users_skills us left join skills s on s.id = us.skill_id WHERE us.user_id = u2.id) skl1
                        ) "skills"
                        FROM participants p2
                        JOIN users u2 on u2.id = p2.user_id
                        WHERE p2.team_id = t.id
                    ) p3
                ) "participants"
            FROM participants p
                JOIN teams t on t.id = p.team_id
            WHERE p.user_id=u.id) t2
    ) "teams"
FROM users u WHERE u.id = $1`,
    [req.jwt.uid]
  );

  return Promise.resolve({ statusCode: 200, data: data.rows[0] });
}

const params = {
  schema: {
    tags: ["teams"],
    summary: "Получить данные о своей команды",
    security: [{ OAuth2: ["user"] }],
  },
};

module.exports = [params, handler];
