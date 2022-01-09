/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn("participants", "user_id", {
    type: "integer",
    references: '"users"',
    onDelete: "cascade",
    notNull: true,
    unique: true,
  });
  pgm.createIndex("participants", "user_id", { unique: true });
};

exports.down = (pgm) => {};
