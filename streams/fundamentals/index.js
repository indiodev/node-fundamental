import { OneToHundredStream } from "./readable.js";
import { InverseNumberStream } from "./transform.js";
import { MultiplyByTenStream } from "./writable.js";

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
