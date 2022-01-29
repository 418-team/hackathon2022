async function handler(req) {
    const p = req.params;
    const { uid: user_id } = req.jwt;

    const team = (
        await req.pg.query("SELECT id FROM teams WHERE invite_code=$1", [p.code])
    ).rows[0];


    if (!team)
        return Promise.reject({
            statusCode: 400,
            error: "already_exists",
            message: "Комадны не существует",
        });

    await req.pg.query(
        `INSERT INTO participants (user_id, team_id) VALUES ($1, $2) on conflict (user_id) do update set team_id = $2`,
        [user_id, team.id]
    );

    return Promise.resolve({ statusCode: 200, id: team.id });
}

const params = {
    schema: {
        tags: ["teams"],
        summary: "Присоедениться к команде",
        security: [{ OAuth2: ["user"] }],
        params: {
            type: "object",
            required: ["code"],
            properties: {
                code: { type: "string" },
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