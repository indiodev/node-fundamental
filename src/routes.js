import { Database } from "./database.js";

const database = new Database();

export const ROUTES = [
  {
    method: "GET",
    path: "/users",
    handler: (request, response) => {
      const users = database.select("users");
      return response
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users, null, 2));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        name,
        email,
      };

      database.insert("users", user);
      return response.writeHead(201).end();
    },
  },
];
