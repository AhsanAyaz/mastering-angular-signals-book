import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplatePowerUpsComponent } from './template-power-ups.component';

describe('TemplatePowerUpsComponent', () => {
  let component: TemplatePowerUpsComponent;
  let fixture: ComponentFixture<TemplatePowerUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePowerUpsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatePowerUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial state with spread baseStyles and update status on button click', async () => {
    const statusCard = fixture.nativeElement.querySelector('[data-testid="statusCard"]');
    expect(statusCard.classList.contains('p-4')).toBe(true);
    expect(statusCard.classList.contains('font-bold')).toBe(true);

    const statusAlert = fixture.nativeElement.querySelector('[data-testid="statusAlert"]');
    expect(statusAlert.textContent).toContain('System Busy (State: idle)');

    // Click button to advance step (idle -> processing)
    const advanceBtn = fixture.nativeElement.querySelector('[data-testid="advanceBtn"]');
    advanceBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.currentStatus()).toBe('processing');
    const updatedStatusAlert = fixture.nativeElement.querySelector('[data-testid="statusAlert"]');
    expect(updatedStatusAlert.textContent).toContain('System Busy (State: processing)');

    // Click button again to advance step (processing -> completed)
    advanceBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.currentStatus()).toBe('completed');
    const newStatusAlert = fixture.nativeElement.querySelector('[data-testid="statusAlert"]');
    expect(newStatusAlert.textContent).toContain('Task Completed Successfully');
  });
});
