import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { PdfService } from "./pdf.service";

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {
  }
  
  @Post()
  public async create(@Req() req: Request) {
    const { html, options } = req.body;
    const parseHtml = html.replace(/\\r|\\n|\\/g, '');
    const pdfBuffer = await this.pdfService.create(parseHtml, options);
    return {
      success: true,
      data: pdfBuffer
    };
  }
}
