import { Service } from '@angular/core';

@Service()
export class PaymentService {
  processPayment(method: string, amount: number) {
    console.log(`Processing payment of $${amount} via ${method}`);
    return {
      success: true,
      transactionId: 'TX-' + Math.random().toString(36).substring(2, 11).toUpperCase()
    };
  }
}
