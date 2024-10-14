import { createServer } from "node:http";
import { Database } from "./database.js";
import { _json } from "./middlewares/json.js";
import { ROUTES } from "./routes.js";

const database = new Database();

const server = createServer(async function (request, response) {
  const { method, url } = request;

  await _json(request, response);

  const route = ROUTES.find((route) => {
    return route.method === method && route.path === url;
  });

  if (!route) return response.writeHead(404).end();

  return route.handler(request, response);
});

server.listen(3333);
