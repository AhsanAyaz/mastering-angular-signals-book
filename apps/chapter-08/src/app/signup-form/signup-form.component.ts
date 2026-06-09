import { Component, computed, effect, model } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #form="ngForm">
      <div class="form-group">
        <input
          type="email"
          [ngModel]="email()"
          (ngModelChange)="email.set($event)"
          name="email"
          placeholder="Email"
          required
          />
          @if (emailErrors()) {
            <div class="error" data-testid="emailError">
              {{ emailErrors() }}
            </div>
          }
        </div>
    
        <div class="form-group">
          <input
            type="password"
            [ngModel]="password()"
            (ngModelChange)="password.set($event)"
            name="password"
            placeholder="Password"
            required
            />
            @if (passwordErrors()) {
              <div class="error" data-testid="passwordError">
                {{ passwordErrors() }}
              </div>
            }
          </div>
    
          <button type="submit" [disabled]="!isFormValid()">
            {{ submitButtonText() }}
          </button>
        </form>
    `,
  styles: [
    `
      .form-group {
        margin-bottom: 16px;
      }
      input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
      }
      .error {
        color: red;
        font-size: 0.875rem;
        margin-top: 4px;
      }
      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }
      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `,
  ],
})
export class SignupFormComponent {
  email = model('');
  password = model('');
  isSubmitting = model(false);

  emailErrors = computed(() => {
    const email = this.email();
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Invalid email format';
    return '';
  });

  passwordErrors = computed(() => {
    const password = this.password();
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  });

  isFormValid = computed(() => {
    return (
      !this.emailErrors() && !this.passwordErrors() && !this.isSubmitting()
    );
  });

  submitButtonText = computed(() => {
    return this.isSubmitting() ? 'Submitting...' : 'Sign Up';
  });

  constructor() {
    effect(() => {
      // Log form validity changes
      console.log('Form validity changed:', this.isFormValid());
    });
  }

  async onSubmit() {
    if (!this.isFormValid()) return;

    this.isSubmitting.set(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', {
        email: this.email(),
        password: this.password(),
      });
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
