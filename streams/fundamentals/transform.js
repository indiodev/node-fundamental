import { Transform } from "node:stream";

export class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}
