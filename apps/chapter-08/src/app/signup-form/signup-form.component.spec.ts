import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form.component';
import { vi, MockInstance } from 'vitest';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let consoleSpy: MockInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFormComponent, FormsModule],
    }).compileComponents();

    consoleSpy = vi.spyOn(console, 'log');
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Email Validation', () => {
    it('should show required error when email is empty', () => {
      component.email.set('');
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector(
        '[data-testid="emailError"]'
      );
      expect(errorElement.textContent.trim()).toBe('Email is required');
    });

    it('should show invalid format error for incorrect email', () => {
      component.email.set('invalid-email');
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector(
        '[data-testid="emailError"]'
      );
      expect(errorElement.textContent.trim()).toBe('Invalid email format');
    });

    it('should not show error for valid email', () => {
      component.email.set('test@example.com');
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector(
        '[data-testid="emailError"]'
      );
      expect(errorElement).toBeFalsy();
    });
  });

  describe('Password Validation', () => {
    it('should show required error when password is empty', () => {
      component.password.set('');
      fixture.detectChanges();

      const errorElements = fixture.nativeElement.querySelectorAll(
        '[data-testid="passwordError"]'
      );
      const passwordError = Array.from(
        errorElements as NodeListOf<HTMLElement>
      ).find((el) => el.textContent?.includes('Password'));
      expect(passwordError?.textContent?.trim()).toBe('Password is required');
    });

    it('should show length error for short password', () => {
      component.password.set('short');
      fixture.detectChanges();

      const errorElements = fixture.nativeElement.querySelectorAll(
        '[data-testid="passwordError"]'
      );
      const passwordError = Array.from(
        errorElements as NodeListOf<HTMLElement>
      ).find((el) => el.textContent?.includes('Password'));
      expect(passwordError?.textContent?.trim()).toBe(
        'Password must be at least 8 characters'
      );
    });

    it('should not show error for valid password', () => {
      component.password.set('validpassword123');
      fixture.detectChanges();

      const errorElements = fixture.nativeElement.querySelectorAll(
        '[data-testid="passwordError"]'
      );
      const passwordError = Array.from(
        errorElements as NodeListOf<HTMLElement>
      ).find((el) => el.textContent?.includes('Password'));
      expect(passwordError).toBeFalsy();
    });
  });

  describe('Form Validity', () => {
    it('should disable submit button when form is invalid', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      component.email.set('test@example.com');
      component.password.set('validpassword123');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });

    it('should log form validity changes', () => {
      component.email.set('test@example.com');
      component.password.set('validpassword123');
      fixture.detectChanges();

      expect(consoleSpy).toHaveBeenCalledWith('Form validity changed:', true);
    });
  });

  describe('Form Submission', () => {
    it('should show submitting state during submission', async () => {
      component.email.set('test@example.com');
      component.password.set('validpassword123');
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('ngSubmit'));
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Submitting...');
      expect(button.disabled).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      fixture.detectChanges();

      expect(button.textContent.trim()).toBe('Sign Up');
      expect(button.disabled).toBe(false);
    });

    it('should log form data on successful submission', async () => {
      const testEmail = 'test@example.com';
      const testPassword = 'validpassword123';

      component.email.set(testEmail);
      component.password.set(testPassword);
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('ngSubmit'));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      fixture.detectChanges();

      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        email: testEmail,
        password: testPassword,
      });
    });

    it('should reset submitting state after error', async () => {
      component.email.set('test@example.com');
      component.password.set('validpassword123');
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('ngSubmit'));
      fixture.detectChanges();

      expect(component.isSubmitting()).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      fixture.detectChanges();

      expect(component.isSubmitting()).toBe(false);
    });
  });

  describe('UI Elements', () => {
    it('should have correct input types', () => {
      const emailInput = fixture.nativeElement.querySelector(
        'input[type="email"]'
      );
      const passwordInput = fixture.nativeElement.querySelector(
        'input[type="password"]'
      );

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
    });

    it('should have correct placeholders', () => {
      const emailInput = fixture.nativeElement.querySelector(
        'input[type="email"]'
      );
      const passwordInput = fixture.nativeElement.querySelector(
        'input[type="password"]'
      );

      expect(emailInput.placeholder).toBe('Email');
      expect(passwordInput.placeholder).toBe('Password');
    });

    it('should have required attribute on inputs', () => {
      const emailInput = fixture.nativeElement.querySelector(
        'input[type="email"]'
      );
      const passwordInput = fixture.nativeElement.querySelector(
        'input[type="password"]'
      );

      expect(emailInput.required).toBe(true);
      expect(passwordInput.required).toBe(true);
    });
  });
});
