import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { ZipService } from './zip.service';

describe('ZipService', () => {
  let service: ZipService;
  const root = path.resolve();
  const folderPath = `${root}/src/zip/__mock__`;
  const files = fs.readdirSync(folderPath).map((file) => ({
    name: file,
    buffer: fs.readFileSync(path.join(folderPath, file)),
  }));
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZipService],
    }).compile();

    service = module.get<ZipService>(ZipService);
  });

  it('should zip files with password successfully', async () => {
    // Act
    const zipBuffer = await service.create(files, { password: '123' });

    // Assert
    expect(Buffer.isBuffer(zipBuffer)).toEqual(true);
  }, 50000);

  it('should zip files without password successfully', async () => {
    // Act
    const zipBuffer = await service.create(files);

    // Assert
    expect(Buffer.isBuffer(zipBuffer)).toEqual(true);
  }, 50000);
});
