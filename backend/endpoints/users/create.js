const { createHash } = require("../../utils/security");

const SQL = `
    INSERT INTO users (email, first_name, last_name, password, scopes)
    VALUES ($1, $2, $3, $5, $6)
    RETURNING id
`;

async function handler(req) {
  const b = req.body;

  const user = (
    await req.pg.query("SELECT id FROM users WHERE email=$1", [b.email])
  ).rows[0];
  if (user)
    return Promise.reject({
      statusCode: 400,
      error: "already_exists",
      message: "Пользователь уже существует",
    });

  const result = (
    await req.pg.query(SQL, [
      b.email,
      b.first_name,
      b.last_name,
      createHash(b.password),
      b.is_admin ? ["user", "admin"] : ["user"],
    ])
  ).rows[0];

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["users"],
    summary: "Создать пользователя",
    security: [{ OAuth2: ["admin"] }],
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        patronymic: { type: "string" },
        specialization: { type: "string" },
        password: { type: "string" },
        is_admin: { type: "integer" },
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
