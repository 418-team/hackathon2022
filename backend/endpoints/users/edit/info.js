const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Событие с таким ID не найден'
};

async function handler(req, res) {
    const data = (await req.pg.query('SELECT * FROM users WHERE id=$1', [req.params.id])).rows[0];
    if (!data) return Promise.reject(ERROR_404);
    return Promise.resolve({statusCode: 200, data});
}

const params = {
    schema: {
        tags: ['users'],
        summary: 'Информация о пользователе',
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer', example: 200},
                    data: {
                        type: 'object',
                        properties: {
                            id: {type: "integer"},
                            first_name: {type: "string"},
                            last_name: {type: "string"},
                            patronymic: {type: "string"},
                            email: {type: "string"},
                        }
                    }
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