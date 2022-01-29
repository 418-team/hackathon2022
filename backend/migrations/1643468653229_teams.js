/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns("teams", "invite_code", {
        type: "varchar", notNull: true
    })
};

exports.down = pgm => {};
