const {createHash} = require('../../utils/security');

const SQL = `
    INSERT INTO users (email, first_name, last_name, patronymic, password, scopes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
`;

async function handler(req, res) {
    const b = req.body;

    const user = (await req.pg.query('SELECT id FROM users WHERE email=$1', [b.email])).rows[0];
    if (user) return Promise.reject({statusCode: 400, error: 'already_exists', message: 'Пользователь уже существует'});

    const result = (await req.pg.query(SQL, [b.email, b.first_name, b.last_name, b.patronymic,
        b.phone, createHash(b.password), b.specialization, b.is_admin ? ['user', 'admin'] : ['user']])).rows[0];
    console.log(result);

    return Promise.resolve({statusCode: 200, id: result.id});
}

const params = {
    schema: {
        tags: ['users'],
        summary: 'Создать пользователя',
        security: [{OAuth2: ['admin']}],
        body: {
            type: 'object',
            properties: {
                email: {type: 'string'},
                first_name: {type: 'string'},
                last_name: {type: 'string'},
                patronymic: {type: 'string'},
                specialization: {type: 'string'},
                password: {type: 'string'},
                is_admin: {type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    id: {type: 'integer'}
                }
            }
        }
    }
};

module.exports = [params, handler];