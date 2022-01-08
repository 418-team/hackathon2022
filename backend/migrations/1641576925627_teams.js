/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("teams", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text", notNull: false },
    admin_id: {
      type: "integer",
      references: '"users"',
      onDelete: "cascade",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("teams", "id");

  pgm.createTable("invites", {
    id: "id",
    user_id: {
      type: "integer",
      references: '"users"',
      onDelete: "cascade",
      notNull: true,
    },
    message: { type: "varchar(255)", notNull: false },
    team_id: {
      type: "integer",
      references: '"teams"',
      onDelete: "cascade",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("invites", "id");

  pgm.createTable("participants", {
    id: "id",
    user_id: {
      type: "integer",
      references: '"users"',
      onDelete: "cascade",
      notNull: true,
    },
    team_id: {
      type: "integer",
      references: '"teams"',
      onDelete: "cascade",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("participants", "id");
  pgm.createIndex("participants", "team_id");
};

exports.down = (pgm) => {};
