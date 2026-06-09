import { Component, injectAsync, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heavy-reports',
  imports: [CommonModule],
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto my-8">
      <div class="card-body items-center text-center">
        <h2 class="card-title block mb-4">Financial Reports</h2>
        <button 
          class="btn btn-primary" 
          (click)="generateReport()"
          data-testid="generatePdfBtn"
        >
          Generate PDF
        </button>

        @if (reportName()) {
          <div class="alert alert-info mt-4" data-testid="reportSuccessAlert">
            <span>Generated: {{ reportName() }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class HeavyReportsComponent {
  reportName = signal<string | null>(null);

  // injectAsync returns a function to load the service dynamically
  private loadPdfService = injectAsync(() => import('./pdf-generator.service').then(m => m.PdfGeneratorService));

  async generateReport() {
    const pdfService = await this.loadPdfService();
    const filename = pdfService.buildPDF({ timestamp: Date.now() });
    this.reportName.set(filename);
  }
}
