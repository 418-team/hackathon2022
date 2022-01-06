async function handler(req, res) {
    const {rows} = await req.pg.query('SELECT e.id, e.user_id, u.first_name, u.last_name, u.patronymic, e.title, e.description, e.date_start, e.date_end, e.location FROM events e\n' +
        'JOIN users u on u.id = e.user_id\n' +
        'ORDER BY id DESC');
    return Promise.resolve({statusCode: 200, rows});
}

const params = {
    schema: {
        tags: ['events'],
        summary: 'Список событий',
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
                                user_id: {type: 'integer'},
                                title: {type: 'string'},
                                description: {type: 'string'},
                                date_start: {type: 'string'},
                                date_end: {type: 'string'},
                                location: {type: 'string'},
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = [params, handler];