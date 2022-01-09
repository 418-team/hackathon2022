/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("skills", {
    id: "id",
    title: { type: "varchar(64)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("users_skills", {
    id: "id",
    user_id: {
      type: "integer",
      references: '"users"',
      onDelete: "cascade",
      notNull: true,
      unique: true,
    },
    skill_id: {
      type: "integer",
      references: '"skills"',
      onDelete: "cascade",
      notNull: true,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {};
