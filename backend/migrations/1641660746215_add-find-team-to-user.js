/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("users", {
    find_team: { type: "boolean", notNull: true, default: false },
  });
};

exports.down = (pgm) => {};
