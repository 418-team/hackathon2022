const ERROR_404 = {
  statusCode: 404,
  error: "not_found",
  message: "Событие с таким ID не найдено",
};

async function handler(req) {
  const data = (
    await req.pg.query("SELECT * FROM events WHERE id=$1", [req.params.id])
  ).rows[0];
  if (!data) return Promise.reject(ERROR_404);

  await req.pg.query(
    "UPDATE events SET title=$2, description=$3, date_start=$4, date_end=$5, location=$6  WHERE id=$1",
    [
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.date_start,
      req.body.date_end,
      req.body.location,
    ]
  );

  return Promise.resolve({ statusCode: 200 });
}

const params = {
  schema: {
    tags: ["events"],
    security: [{ OAuth2: ["admin"] }],
    summary: "Редактировать событие",
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        date_start: { type: "string" },
        date_end: { type: "string" },
        location: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 200 },
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
