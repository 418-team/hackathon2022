const UpdateSQL = `
  insert into participants (user_id, team_id) values ($1, (select team_id from invites where id=$2))
  on conflict (user_id) do update set team_id = (select team_id from invites where id=$2) returning team_id
`;

const DeleteSQL = `
  delete from invites where id=$1 returning id
`;

async function handler(req) {
  const { uid: user_id } = req.jwt;
  const p = req.params;
  const result = (await req.pg.query(UpdateSQL, [user_id, p.id])).rows[0];
  await req.pg.query(DeleteSQL, [p.id]);
  await req.pg.query(`update users set find_team = false where id=$1`, [user_id])

  return Promise.resolve({ statusCode: 200, id: result.id });
}

const params = {
  schema: {
    tags: ["invites"],
    summary: "Принят приглашение",
    security: [{ OAuth2: ["user"] }],
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
