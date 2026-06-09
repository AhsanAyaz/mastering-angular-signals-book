import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signal',
  },
  {
    path: 'signal',
    loadComponent: () => {
      return import('./signal/signal.component').then((m) => m.SignalComponent);
    },
    data: {
      name: 'Signal',
    },
  },
  {
    path: 'computed',
    loadComponent: () => {
      return import('@modern-angular-signals-book/common-pages').then(
        (m) => m.ComputedComponent
      );
    },
    data: {
      name: 'Computed',
    },
  },
  {
    path: 'effect',
    loadComponent: () => {
      return import('./effect/effect.component').then((m) => m.EffectComponent);
    },
    data: {
      name: 'Effect',
    },
  },
];
