import * as fs from 'fs';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(async () => {
    service = new PdfService();
  });

  it('create pdf successfully', async () => {
    // Arrange
    const html = '<div>Hello World</div>';

    // Act
    const buffer = await service.create(html);
    fs.writeFileSync(__dirname + '/mocks/document.pdf', buffer);

    // Assert
    expect(Buffer.isBuffer(buffer)).toEqual(true);
  });
});
