/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        first_name: {type: 'varchar(32)', notNull: true},
        last_name: {type: 'varchar(64)', notNull: true},
        patronymic: {type: 'varchar(64)', notNull: false},
        password: {type: 'text', notNull: true},
        email: {type: 'varchar(256)', unique: true, notNull: true},
        scopes: {type: 'text[]', default: '{}'},
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
    
    pgm.createIndex('users', 'id', {unique: true});
    pgm.createIndex('users', 'email', {unique: true});
};

exports.down = pgm => {};
