import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutFormComponent } from './checkout-form.component';
import { PaymentService } from './payment.service';
import { vi } from 'vitest';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;
  let paymentService: PaymentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutFormComponent],
      providers: [PaymentService]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    paymentService = TestBed.inject(PaymentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form and process payment on submit', async () => {
    // Initial state: method is empty, form should be invalid
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checkoutForm().invalid()).toBe(true);

    // Update form model signal to make form valid
    component.formModel.set({ method: 'credit', amount: 100 });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkoutForm().valid()).toBe(true);

    const spy = vi.spyOn(paymentService, 'processPayment');

    component.onSubmit();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith('credit', 100);
    expect(component.paymentResult()).toBeTruthy();
    expect(component.paymentResult().success).toBe(true);
  });
});
