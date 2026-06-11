import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required } from '@angular/forms/signals';
import { AccordionGroup, AccordionPanel, AccordionTrigger, AccordionContent } from '@angular/aria/accordion';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-checkout-form',
  imports: [
    CommonModule,
    FormField,
    AccordionGroup,
    AccordionPanel,
    AccordionTrigger,
    AccordionContent
  ],
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto my-8">
      <div class="card-body">
        <h2 class="card-title text-center block mb-4">Checkout</h2>
        <form (submit)="onSubmit(); $event.preventDefault()">
          
          <div ngAccordionGroup class="border border-base-300 rounded-lg p-2 mb-4 bg-base-100">
            <!-- Angular Aria Accordion -->
            <div class="accordion-item">
              <h3>
                <button 
                  type="button" 
                  ngAccordionTrigger 
                  [panel]="paymentPanel"
                  [expanded]="true" 
                  class="btn btn-ghost btn-block justify-between font-bold"
                >
                  <span>1. Payment Details</span>
                  <span class="text-xs">▼</span>
                </button>
              </h3>
              <div ngAccordionPanel #paymentPanel="ngAccordionPanel">
                <ng-template ngAccordionContent>
                  <div class="p-4 flex flex-col gap-4">
                    
                    <div class="form-control w-full">
                      <label class="label" for="payment-method-select">
                        <span class="label-text font-semibold">Select Payment Method</span>
                      </label>
                      <select 
                        id="payment-method-select"
                        [formField]="checkoutForm.method"
                        class="select select-bordered w-full"
                      >
                        <option value="">Choose Method...</option>
                        <option value="credit">Credit Card</option>
                        <option value="paypal">PayPal</option>
                      </select>
                      @if (checkoutForm.method().invalid() && checkoutForm.method().touched()) {
                        <div class="label">
                          <span class="label-text-alt text-error">A payment method is required.</span>
                        </div>
                      }
                    </div>

                    <div class="form-control w-full">
                      <label class="label" for="amount-input">
                        <span class="label-text font-semibold">Amount ($)</span>
                      </label>
                      <input 
                        id="amount-input"
                        type="number"
                        [formField]="checkoutForm.amount"
                        class="input input-bordered w-full"
                      />
                    </div>

                  </div>
                </ng-template>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-block animate-none"
            [disabled]="checkoutForm().invalid()"
            data-testid="payButton"
          >
            Pay {{ checkoutForm.amount().value() | currency }}
          </button>
        </form>

        @if (paymentResult()) {
          <div class="alert alert-success mt-4" data-testid="paymentSuccessAlert">
            <span>Payment Successful! Txn ID: {{ paymentResult()?.transactionId }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutFormComponent {
  private paymentService = inject(PaymentService);
  paymentResult = signal<{ success: boolean; transactionId: string } | null>(null);

  // Schema-based validation built-in to Signal Forms
  formModel = signal({ method: '', amount: 100 });
  checkoutForm = form(this.formModel, schema => {
    required(schema.method);
    required(schema.amount);
  });

  onSubmit() {
    if (this.checkoutForm().valid()) {
      const { method, amount } = this.checkoutForm().value();
      const result = this.paymentService.processPayment(method, amount);
      this.paymentResult.set(result);
    }
  }
}
