import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, PDFOptions } from 'puppeteer';

@Injectable()
export class PdfService {
  private browser: Browser;

  async create(html: string, options?: PDFOptions) {
    this.browser = await puppeteer.launch({ headless: 'new' });
    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf(options);
    await page.close();
    await this.browser.close();
    return buffer;
  }
}
