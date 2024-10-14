import { createServer } from "node:http";
import { METHOD, ROUTE, USER_LIST } from "./constant.js";
import { Database } from "./database.js";
import { _json } from "./middlewares/json.js";

const database = new Database();

const server = createServer(async function (request, response) {
  const { method, url } = request;

  await _json(request, response);

  if (method === METHOD.GET && url === ROUTE.USERS) {
    const users = database.select("users");
    return response
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users, null, 2));
  }

  if (method === METHOD.POST && url === ROUTE.USERS) {
    const { name, email } = request.body;

    const user = {
      id: USER_LIST.length + 1,
      name,
      email,
    };

    database.insert("users", user);
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

server.listen(3333);
