import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../db.json", import.meta.url);
export class Database {
  #database = {};

  constructor() {
    readFile(path, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    writeFile(path, JSON.stringify(this.#database, null, 2));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    const id = randomUUID();
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push({ id, ...data });
    } else {
      this.#database[table] = [{ id, ...data }];
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
