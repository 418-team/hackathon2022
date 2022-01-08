/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("events", {
    min_participants: {
      type: "integer",
      notNull: true,
      default: 1,
    },
    max_participants: {
      type: "integer",
      notNull: true,
      default: 5,
    },
  });
  pgm.createIndex("events", "id", { unique: true });
};
