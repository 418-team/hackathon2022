/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("events", {
        id: "id",
        user_id: {
            type: 'integer',
            references: '"users"',
            onDelete: 'cascade',
            notNull: true
        },
        title: {type: "varchar(64)", notNull: true},
        description: {type: 'text', notNull: true},
        date_start: {type: "timestamptz", notNull: true},
        date_end: {type: "timestamptz", notNull: true},
        location: {type: "string", notNull: true, default: "Россия"},
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {};
