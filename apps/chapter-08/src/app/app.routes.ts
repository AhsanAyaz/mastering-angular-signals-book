import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
  {
    path: 'counter',
    loadComponent: () => {
      return import('./counter/counter.component').then(
        (m) => m.CounterComponent
      );
    },
    data: {
      name: 'Counter',
    },
  },
  {
    path: 'weather',
    loadComponent: () => {
      return import('./weather/weather-info.component').then(
        (m) => m.WeatherInfoComponent
      );
    },
    data: {
      name: 'Weather',
    },
  },
  {
    path: 'signup-form',
    loadComponent: () => {
      return import('./signup-form/signup-form.component').then(
        (m) => m.SignupFormComponent
      );
    },
    data: {
      name: 'Signup Form',
    },
  },
  {
    path: 'profile',
    loadComponent: () => {
      return import('./profile/profile.component').then(
        (m) => m.ProfileExampleComponent
      );
    },
    data: {
      name: 'Profile',
    },
  },
  {
    path: 'full-name',
    loadComponent: () => {
      return import('./full-name/full-name.component').then(
        (m) => m.FullNameComponent
      );
    },
    data: {
      name: 'Full name',
    },
  },
  {
    path: 'my-button',
    loadComponent: () => {
      return import('./my-button/my-button.component').then(
        (m) => m.MyButtonComponent
      );
    },
    data: {
      name: 'my button',
    },
  },
  {
    path: 'my-input',
    loadComponent: () => {
      return import('./my-input/my-input.component').then(
        (m) => m.MyInputComponent
      );
    },
    data: {
      name: 'My input',
    },
  },
  {
    path: 'heavy-reports',
    loadComponent: () => {
      return import('./heavy-reports/heavy-reports.component').then(
        (m) => m.HeavyReportsComponent
      );
    },
    data: {
      name: 'Heavy Reports (injectAsync)',
    },
  },
];
