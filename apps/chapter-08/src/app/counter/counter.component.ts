import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h2 class="text-3xl text-center">Counter</h2>
        <div class="flex gap-4 mx-auto items-center">
          <button (click)="decrement()" class="btn btn-outline">-</button>
          <div class="stats shadow">
            <div class="stat">
              <div data-testid="countValue" class="stat-value">
                {{ count() }}
              </div>
            </div>
          </div>
          <button (click)="increment()" class="btn btn-outline">+</button>
        </div>
      </div>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((v) => v + 1);
  }

  decrement() {
    this.count.update((v) => Math.max(0, v - 1));
  }
}
