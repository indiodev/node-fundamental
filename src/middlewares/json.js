/**
 * JSON middleware
 * @param {import("node:http").IncomingMessage} request
 * @param {import("node:http").ServerResponse} response
 */
export async function _json(request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  response.setHeader("Content-Type", "application/json");
}
