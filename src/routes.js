import { Database } from "./database.js";
import { buildRoutePatch } from "./utils/build-route-path.js";

const database = new Database();

export const ROUTES = [
  {
    method: "GET",
    path: buildRoutePatch("/users"),
    handler: (request, response) => {
      const { search } = request.query;
      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );
      return response
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users, null, 2));
    },
  },
  {
    method: "POST",
    path: buildRoutePatch("/users"),
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
  {
    method: "DELETE",
    path: buildRoutePatch("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      database.delete("users", id);
      return response.writeHead(204).end();
    },
  },

  {
    method: "PUT",
    path: buildRoutePatch("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;
      const user = {
        name,
        email,
      };
      database.update("users", id, user);
      return response.writeHead(204).end();
    },
  },
];
