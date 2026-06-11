import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherInfoComponent } from './weather-info.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { WeatherService } from './weather.service';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather on initialization', async () => {
    const getWeather = vi
      .spyOn(component.weatherService, 'getWeather')
      .mockImplementation(() => {
        return of({
          temperature: 25,
          condition: 'Sunny',
          icon: 'assets/sunny.png',
        });
      });

    fixture.detectChanges();
    expect(getWeather).toHaveBeenCalled();
  });

  it('should show loading state initially', async () => {
    const weatherSubject = new Subject<any>();
    const getWeather = vi
      .spyOn(component.weatherService, 'getWeather')
      .mockImplementation(() => weatherSubject);

    fixture.detectChanges();

    expect(component.weatherResource.isLoading()).toBe(true);
    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherLoader"]')
    ).toBeTruthy();
  });

  it('should display weather data after loading', async () => {
    const mockWeatherData = {
      temperature: 25,
      condition: 'Sunny',
      icon: 'assets/sunny.png',
    };
    const weatherSubject = new Subject<typeof mockWeatherData>();
    const getWeather = vi
      .spyOn(component.weatherService, 'getWeather')
      .mockImplementation(() => weatherSubject);

    fixture.detectChanges();

    expect(component.weatherResource.isLoading()).toBe(true);

    weatherSubject.next(mockWeatherData);
    weatherSubject.complete();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherLoader"]')
    ).toBeFalsy();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherTemp"]')
        .textContent
    ).toContain('Temperature: 25');
    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherCond"]')
        .textContent
    ).toContain('Condition: Sunny');
  });

  it('should display error message on error', async () => {
    const errorMessage = 'Could not fetch data';
    const weatherSubject = new Subject<any>();
    const getWeather = vi
      .spyOn(component.weatherService, 'getWeather')
      .mockImplementation(() => weatherSubject);

    fixture.detectChanges();

    expect(component.weatherResource.isLoading()).toBe(true);

    weatherSubject.error(new Error(errorMessage));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherError"]')
        .textContent
    ).toContain(`Error: ${errorMessage}`);
  });
});
