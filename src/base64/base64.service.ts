import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Config } from './base64.interface';

@Injectable()
export class Base64Service {
  encode(message: any, config: Config) {
    if (config.type === 'text') {
      return this.encodeFromText(message);
    } else if (config.type === 'image' && config.path) {
      return this.encodeFromImage(config.path);
    }
  }

  decode(message: any, config: Config) {
    if (config.type === 'text') {
      return this.decodeFromText(message);
    }
  }

  encodeFromText(text: string) {
    return Buffer.from(text).toString('base64');
  }

  encodeFromImage(path: string) {
    const image = fs.readFileSync(path, { encoding: 'base64' });
    return 'data:image/jpg;base64,' + image;
  }

  decodeFromText(text: string) {
    return Buffer.from(text, 'base64').toString('utf-8');
  }
}
