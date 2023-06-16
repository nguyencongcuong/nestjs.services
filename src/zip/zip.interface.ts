export interface ZipPayload {
  name: string;
  buffer: Buffer;
}

export interface ZipOptions {
  password?: string;
}
