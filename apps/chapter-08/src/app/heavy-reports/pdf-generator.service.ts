import { Service } from '@angular/core';

@Service()
export class PdfGeneratorService {
  buildPDF(data: { timestamp: number }) {
    console.log('Building PDF at timestamp:', data.timestamp);
    return `PDF-REPORT-${data.timestamp}.pdf`;
  }
}
