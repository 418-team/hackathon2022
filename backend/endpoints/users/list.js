async function handler(req, res) {
    const {rows} = await req.pg.query('SELECT id, email, first_name, last_name, patronymic, specialization, scopes FROM users ORDER BY id DESC');
    return Promise.resolve({statusCode: 200, rows});
}

const params = {
    schema: {
        tags: ['users'],
        summary: 'Список пользователей',
        security: [{OAuth2: ['admin']}],
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    rows: {
                        type: 'array',
                        additionalProperties: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                email: {type: 'string'},
                                first_name: {type: 'string'},
                                last_name: {type: 'string'},
                                patronymic: {type: 'string'},
                                specialization: {type: 'string'},
                                scopes: {type: 'array'}
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = [params, handler];