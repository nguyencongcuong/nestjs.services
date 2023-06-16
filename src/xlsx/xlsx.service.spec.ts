import { Test, TestingModule } from '@nestjs/testing';
import { XlsxService } from './xlsx.service';
import * as fs from 'fs';

describe('XlsxService', () => {
  let service: XlsxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XlsxService],
    }).compile();

    service = module.get<XlsxService>(XlsxService);
  });

  it('should be able to generate xlsx', () => {
    // Arrange
    const createXlsxDto = [
      ['Col 1', 'Col 2', 'Col 3', 'Col 4'],
      ['2A', '2B', '2C', '002'],
      ['3A', '3B', '3C', '003'],
    ];

    // Act
    const buffer = service.create(createXlsxDto);
    fs.writeFileSync(`${__dirname}/mocks/001.xlsx`, buffer);

    // Assert
    expect(Buffer.isBuffer(buffer)).toBe(true);
  });
});
