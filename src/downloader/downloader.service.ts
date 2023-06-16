import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';

interface MIME {
  [p: string]: string;
}

interface Options {
  ext: Extension;
  hasDataPrefix?: boolean;
}

type Extension =
  | 'flac'
  | 'mp3'
  | 'ogg'
  | 'wma'
  | 'wav'
  | 'html'
  | 'js'
  | 'css'
  | 'json'
  | 'txt'
  | 'pdf'
  | 'csv'
  | 'xls'
  | 'xlsx'
  | 'doc'
  | 'docx'
  | 'bmp'
  | 'gif'
  | 'ico'
  | 'svg'
  | 'webp'
  | 'jpg'
  | 'jpeg'
  | 'png';

@Injectable()
export class DownloaderService {
  // More MIME List: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
  private MIME: MIME = {
    flac: 'audio/flac',
    mp3: 'audio/mpeg',
    ogg: 'audio/ogg',
    wma: 'audio/x-ms-wma',
    wav: 'audio/wav',

    html: 'text/html',
    js: 'text/javascript',
    css: 'text/css',
    json: 'application/json',

    txt: 'text/plain',
    pdf: 'application/pdf',
    csv: 'text/csv',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    doc: 'application/msword;base64',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    bmp: 'image/bmp',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',

    zip: 'application/zip',
    rar: 'application/vnd.rar',

    mp4: 'video/mp4',
  };
  private options: Options = {
    ext: 'txt',
    hasDataPrefix: false,
  };

  fromBlob(blob: Blob, name: string, ext: Extension): void {
    const fileName = `${name}.${ext}`;
    const a = document.createElement('a');
    const fileURL = URL.createObjectURL(blob);

    a.href = fileURL;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(fileURL);
  }

  fromBase64(
    base64: string,
    name: string,
    options: Options = this.options,
  ): void {
    // Create DataURL: data:[<mediatype>][;base64],<data>
    const { ext, hasDataPrefix } = options;
    const content = hasDataPrefix
      ? base64
      : 'data:' + this.MIME[ext] + ';base64,' + base64;
    const encodedURL = encodeURI(content);
    const a = document.createElement('a');

    a.href = encodedURL;
    a.download = `${name}.${ext}`;
    document.body.appendChild(a);
    a.click();
  }

  fromBuffer(
    buffer: Buffer,
    name: string,
    options: Options = this.options,
  ): void {
    const base64 = buffer.toString('base64');
    this.fromBase64(base64, name, options);
  }
}
