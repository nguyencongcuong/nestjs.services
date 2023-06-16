import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZipService } from './zip/zip.service';
import { XlsxService } from './xlsx/xlsx.service';
import { Base64Service } from './base64/base64.service';
import { DownloaderService } from './downloader/downloader.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from "./pdf/pdf.service";

@Module({
  imports: [],
  controllers: [AppController, PdfController],
  providers: [ AppService, ZipService, XlsxService, Base64Service, DownloaderService, PdfService],
  exports: []
})
export class AppModule {}
