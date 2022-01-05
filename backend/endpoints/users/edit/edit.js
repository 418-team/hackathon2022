const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Пользователь с таким ID не найден'
};

async function handler(req, res) {
    const data = (await req.pg.query('SELECT * FROM users WHERE id=$1', [req.params.id])).rows[0];
    if (!data) return Promise.reject(ERROR_404);

    await req.pg.query('UPDATE users SET first_name=$2, last_name=$3, patronymic=$4, email=$5  WHERE id=$1', [req.params.id, req.body.first_name, req.body.last_name, req.body.patronymic, req.body.email]);

    return Promise.resolve({statusCode: 200});
}

const params = {
    schema: {
        tags: ['users'],
        security: [{OAuth2: ['admin']}],
        summary: 'Редактировать пользователя',
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            properties: {
                first_name: {type: "string"},
                last_name: {type: "string"},
                patronymic: {type: "string"},
                email: {type: "string"},
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer', example: 200}
                }
            },
            404: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    error: {type: 'string'},
                    message: {type: 'string'}
                },
                example: ERROR_404
            }
        }
    }
};

module.exports = [params, handler];