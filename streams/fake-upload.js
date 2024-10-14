import { OneToHundredStream } from "./fundamentals/readable.js";

fetch("http://localhost:4444", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
