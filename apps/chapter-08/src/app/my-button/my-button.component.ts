import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  template: `
    <button
      data-testid="myButton"
      (click)="onClick()"
      [class.active]="isActive()"
    >
      Click Me
    </button>
  `,
  styles: [
    `
      button[data-testid='myButton'] {
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
      }
      button[data-testid='myButton'].active {
        background-color: #e0e0e0;
      }
    `,
  ],
})
export class MyButtonComponent {
  clicked = output<void>();
  isActive = model<boolean>(false);

  onClick() {
    this.clicked.emit();
    this.isActive.update((active) => !active);
  }
}
