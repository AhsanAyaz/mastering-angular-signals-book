import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThemeDirective } from './theme.directive';
import { provideRouter } from '@angular/router';

// Create a simple test host component
@Component({
  template: `<div libTheme></div>`,
  imports: [ThemeDirective],
})
class TestHostComponent {}

// Test component with input binding
@Component({
  template: `<div libTheme [theme]="theme()"></div>`,
  imports: [ThemeDirective],
})
class TestHostWithInputComponent {
  theme = input('light');
}

describe('ThemeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: ThemeDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDirective, TestHostComponent, TestHostWithInputComponent], // Import standalone components/directives
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create an instance using TestBed', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    const directiveEl = fixture.debugElement.query(
      By.directive(ThemeDirective)
    );
    expect(directiveEl).toBeTruthy();
    directive = directiveEl.injector.get(ThemeDirective);
    expect(directive).toBeTruthy();
  });

  it('should set default data-theme attribute on init', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Trigger ngOnInit

    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'synthwave'
    );
  });

  it('should set provided data-theme attribute on init', () => {
    const inputFixture = TestBed.createComponent(TestHostWithInputComponent);
    inputFixture.componentRef.setInput('theme', 'dark');
    inputFixture.detectChanges(); // Trigger ngOnInit

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  // Cleanup after each test
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });
});
