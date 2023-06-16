import { Injectable } from "@nestjs/common";
import * as stream from "stream";
import { ZipPayload, ZipOptions } from "./zip.interface";

const archiver = require("archiver");

archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));

@Injectable()
export class ZipService {
  create(payloads: ZipPayload[], options?: ZipOptions): Promise<Buffer> {
    const buffer: Buffer[] = [];

    const output = new stream.Writable({
      write: function (chunk, _encoding, next) {
        buffer.push(chunk);
        next();
      },
    });

    const archive = options?.password
      ? archiver.create("zip-encrypted", {
          zlib: { level: 1 },
          encryptionMethod: "aes256",
          password: options.password,
        })
      : archiver.create("zip", options, { zlib: { level: 1 } });

    for (const payload of payloads) {
      archive.append(payload.buffer, { name: payload.name });
    }

    archive.pipe(output);

    archive.finalize();

    return new Promise((resolve, reject) => {
      output.on("finish", () => {
        const zipBuffer = Buffer.concat(buffer);
        resolve(zipBuffer);
      });

      output.on("error", reject);
    });
  }
}
