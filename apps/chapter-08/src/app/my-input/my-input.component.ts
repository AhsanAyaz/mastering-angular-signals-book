import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  imports: [FormsModule],
  template: `
    <div class="input-container">
      <input type="text" [(ngModel)]="text" placeholder="Type something..." />
      <p class="preview">Current value: {{ text() }}</p>
    </div>
  `,
  styles: [
    `
      .input-container {
        margin: 16px 0;
      }
      input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
      }
      .preview {
        margin-top: 8px;
        color: #666;
      }
    `,
  ],
})
export class MyInputComponent {
  text = model<string>('');
}
