import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagingApiDataComponent } from './managing-api-data.component';

describe('ManagingApiDataComponent', () => {
  let component: ManagingApiDataComponent;
  let fixture: ComponentFixture<ManagingApiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagingApiDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagingApiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
