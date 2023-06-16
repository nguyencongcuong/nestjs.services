import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class XlsxService {
  create(createXlsxDto: string[][]) {
    // Create an Excel workbook object
    const workbook = XLSX.utils.book_new();

    // Create a worksheet and add data to it
    const worksheet = XLSX.utils.aoa_to_sheet(createXlsxDto);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Error Report');

    // Format the first column as text
    // for (let i = 1; i <= worksheet['!ref'].split(':')[1].slice(1); i++) {
    //   worksheet[XLSX.utils.encode_cell({c: 0, r: i})].z = '@';
    // }

    // Save the workbook as buffer
    return XLSX.write(workbook, { type: 'buffer' });
  }
}
