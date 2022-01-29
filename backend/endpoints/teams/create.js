const { uid } = require('uid');


const SQL = `
    INSERT INTO teams (title, description, admin_id, invite_code)
    VALUES ($1, $2, $3, $4)
    RETURNING id
`;

async function handler(req) {
  const b = req.body;
  const { uid: user_id } = req.jwt;

  const user = (
    await req.pg.query("SELECT id FROM teams WHERE title=$1", [b.title])
  ).rows[0];
  if (user)
    return Promise.reject({
      statusCode: 400,
      error: "already_exists",
      message: "Комадна с таким названием уже существует",
    });

  const result = (
    await req.pg.query(SQL, [b.title, b.description, b.admin_id || user_id, uid(6)])
  ).rows[0];

  await req.pg.query(
    `INSERT INTO participants (user_id, team_id) VALUES ($1, $2)`,
    [user_id, result.id]
  );

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["teams"],
    summary: "Создать комадну",
    security: [{ OAuth2: ["user"] }],
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        admin_id: { type: "string" },
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
