/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn("users_skills", "user_id", {
    type: "integer",
    references: '"users"',
    onDelete: "cascade",
    notNull: true,
  });
  pgm.alterColumn("users_skills", "skill_id", {
    type: "integer",
    references: '"skills"',
    onDelete: "cascade",
    notNull: true,
  });
};

exports.down = (pgm) => {};
