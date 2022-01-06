const ERROR_404 = {
  statusCode: 404,
  error: "not_found",
  message: "Событие с таким ID не найден",
};

async function handler(req, res) {
  const data = (
    await req.pg.query("SELECT * FROM events WHERE id=$1", [req.params.id])
  ).rows[0];
  if (!data) return Promise.reject(ERROR_404);
  return Promise.resolve({ statusCode: 200, data });
}

const params = {
  schema: {
    tags: ["events"],
    summary: "Информация о событие",
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 200 },
          data: {
            type: "object",
            properties: {
              user_id: { type: "integer" },
              title: { type: "string" },
              description: { type: "string" },
              date_start: { type: "string" },
              date_end: { type: "string" },
              location: { type: "string" },
            },
          },
        },
      },
      404: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          error: { type: "string" },
          message: { type: "string" },
        },
        example: ERROR_404,
      },
    },
  },
};

module.exports = [params, handler];
