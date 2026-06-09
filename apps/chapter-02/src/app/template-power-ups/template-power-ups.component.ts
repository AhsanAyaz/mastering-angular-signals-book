import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TaskStatus = 'idle' | 'processing' | 'completed';

@Component({
  selector: 'app-template-power-ups',
  imports: [CommonModule],
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto my-8">
      <div class="card-body">
        <h2 class="card-title text-center block mb-4">Template Power-ups</h2>
        
        <!-- 1. Spread syntax in style/class configuration object -->
        <div 
          [class.active]="highlight()" 
          [ngClass]="{ ...baseStyles }"
          data-testid="statusCard"
        >
          System Status Tracker
        </div>

        <div class="divider"></div>

        <!-- 2. Consecutive @case statements & 3. exhaustive compilation check -->
        @switch (status) {
          @case ('idle') {
            <p class="alert alert-warning" data-testid="statusAlert">
              System Busy (State: {{ status }})
            </p>
          }
          @case ('processing') {
            <p class="alert alert-warning" data-testid="statusAlert">
              System Busy (State: {{ status }})
            </p>
          }
          @case ('completed') {
            <p class="alert alert-success" data-testid="statusAlert">Task Completed Successfully</p>
          }
          @default never(status);
        }

        <!-- 4. Arrow function inside event binding to mutate signal inline -->
        <button 
          class="btn btn-outline btn-primary mt-4"
          (click)="currentStatus.update(prev => prev === 'idle' ? 'processing' : 'completed')"
          data-testid="advanceBtn"
        >
          Advance Step
        </button>
      </div>
    </div>
  `
})
export class TemplatePowerUpsComponent {
  currentStatus = signal<TaskStatus>('idle');
  highlight = signal(true);
  baseStyles = { 'p-4': true, 'rounded-lg': true, 'text-center': true, 'font-bold': true, 'bg-base-300': true };

  get status(): TaskStatus {
    return this.currentStatus();
  }
}
