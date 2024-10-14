import { Readable } from "node:stream";
export class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i + "\t"));
        this.push(buffer);
      }
    }, 500);
  }
}
