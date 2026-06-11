import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyButtonComponent } from './my-button.component';
import { vi } from 'vitest';

describe('MyButtonComponent', () => {
  let component: MyButtonComponent;
  let fixture: ComponentFixture<MyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when button is clicked', () => {
    const clickedSpy = vi.fn();
    component.clicked.subscribe(clickedSpy);

    const button = fixture.nativeElement.querySelector(
      '[data-testid="myButton"]'
    );
    button.click();

    expect(clickedSpy).toHaveBeenCalled();
  });

  it('should toggle isActive state when clicked', () => {
    const button = fixture.nativeElement.querySelector(
      '[data-testid="myButton"]'
    );

    // Initial state should be false
    expect(component.isActive()).toBeFalsy();
    expect(button.classList.contains('active')).toBeFalsy();

    // First click should set it to true
    button.click();
    fixture.detectChanges();
    expect(component.isActive()).toBeTruthy();
    expect(button.classList.contains('active')).toBeTruthy();

    // Second click should set it back to false
    button.click();
    fixture.detectChanges();
    expect(component.isActive()).toBeFalsy();
    expect(button.classList.contains('active')).toBeFalsy();
  });

  it('should emit isActive state changes', () => {
    const stateChanges: boolean[] = [];
    component.isActive.subscribe((state) => stateChanges.push(state));

    const button = fixture.nativeElement.querySelector(
      '[data-testid="myButton"]'
    );
    button.click(); // First click
    button.click(); // Second click

    expect(stateChanges).toEqual([true, false]);
  });

  it('should apply active class when clicked', () => {
    const button = fixture.nativeElement.querySelector(
      '[data-testid="myButton"]'
    );
    button.click();
    fixture.detectChanges();

    expect(button.classList.contains('active')).toBeTruthy();
  });
});
