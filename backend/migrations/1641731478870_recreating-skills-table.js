/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("users_skills");
  pgm.createTable("users_skills", {
    id: "id",
    user_id: {
      type: "integer",
      references: '"users"',
      onDelete: "cascade",
      notNull: true,
    },
    skill_id: {
      type: "integer",
      references: '"skills"',
      onDelete: "cascade",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("users_skills", "user_id");
  pgm.createIndex("users_skills", "skill_id");
};

exports.down = (pgm) => {};
