import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeavyReportsComponent } from './heavy-reports.component';
import { PdfGeneratorService } from './pdf-generator.service';
import { vi } from 'vitest';

describe('HeavyReportsComponent', () => {
  let component: HeavyReportsComponent;
  let fixture: ComponentFixture<HeavyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeavyReportsComponent],
      providers: [PdfGeneratorService]
    }).compileComponents();

    fixture = TestBed.createComponent(HeavyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lazy load PdfGeneratorService and generate report on click', async () => {
    expect(component.reportName()).toBeNull();

    const generatePdfBtn = fixture.nativeElement.querySelector('[data-testid="generatePdfBtn"]');
    generatePdfBtn.click();

    // Explicitly wait for the lazy-loaded service to resolve and set the signal
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (component.reportName() !== null) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });

    fixture.detectChanges();

    expect(component.reportName()).toContain('PDF-REPORT-');
    expect(fixture.nativeElement.querySelector('[data-testid="reportSuccessAlert"]').textContent).toContain('Generated: PDF-REPORT-');
  });
});
