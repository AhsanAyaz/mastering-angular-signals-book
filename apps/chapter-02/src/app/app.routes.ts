import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-profile',
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
    data: {
      name: 'User Profile',
    },
  },
  {
    path: 'modal-demo',
    loadComponent: () =>
      import('./modal-demo/modal-demo.component').then(
        (m) => m.ModalDemoComponent
      ),
    data: {
      name: 'Modal Demo',
    },
  },
  {
    path: 'user-input',
    loadComponent: () =>
      import('./user-input/user-input.component').then(
        (m) => m.UserInputComponent
      ),
    data: {
      name: 'User Input',
    },
  },
  {
    path: 'managing-api-data',
    loadComponent: () =>
      import('./managing-api-data/managing-api-data.component').then(
        (m) => m.ManagingApiDataComponent
      ),
    data: {
      name: 'Managing API Data',
    },
  },
  {
    path: 'template-power-ups',
    loadComponent: () =>
      import('./template-power-ups/template-power-ups.component').then(
        (m) => m.TemplatePowerUpsComponent
      ),
    data: {
      name: 'Template Powerups',
    },
  },
];
