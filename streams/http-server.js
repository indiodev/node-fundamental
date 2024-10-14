import { createServer } from "node:http";

// request => ReadableStream
// response => WritableStream

const server = createServer(async function (request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);
  return response.end(fullStreamContent);

  // return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(4444);
