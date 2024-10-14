import { createServer } from "node:http";
import { METHOD, ROUTE, USER_LIST } from "./constant.js";
import { _json } from "./middlewares/json.js";

const server = createServer(async function (request, response) {
  const { method, url } = request;

  await _json(request, response);

  if (method === METHOD.GET && url === ROUTE.USERS) {
    return response
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(USER_LIST, null, 2));
  }

  if (method === METHOD.POST && url === ROUTE.USERS) {
    const { name, email } = request.body;
    USER_LIST.push({
      id: USER_LIST.length + 1,
      name,
      email,
    });
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);
