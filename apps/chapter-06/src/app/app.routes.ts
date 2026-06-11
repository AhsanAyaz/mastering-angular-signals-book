import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reactive-inputs',
  },

  {
    path: 'notifications-panel-example',
    loadComponent: () => {
      return import(
        './notifications-panel-example/notifications-panel-example.component'
      ).then((m) => m.NotificationsPanelExampleComponent);
    },
    data: {
      name: 'Notifications panel example',
    },
  },
  {
    path: 'shopping-cart-example',
    loadComponent: () => {
      return import(
        './shopping-cart-example/shopping-cart-example.component'
      ).then((m) => m.ShoppingCartExampleComponent);
    },
    data: {
      name: 'Shopping cart example',
    },
  },
  {
    path: 'reactive-inputs',
    loadComponent: () => {
      return import('./reactive-inputs/reactive-inputs.component').then(
        (m) => m.ReactiveInputsComponent
      );
    },
    data: {
      name: 'Reactive inputs',
    },
  },
  {
    path: 'two-way-binding',
    loadComponent: () => {
      return import('./two-way-binding/two-way-binding.component').then(
        (m) => m.TwoWayBindingComponent
      );
    },
    data: {
      name: 'Two way data binding',
    },
  },
  {
    path: 'cart',
    loadComponent: () => {
      return import('./cart/cart.component').then((m) => m.CartComponent);
    },
  },
  {
    path: 'dynamic-list',
    loadComponent: () => {
      return import('./dynamic-list/dynamic-list.component').then(
        (m) => m.DynamicListComponent
      );
    },
    data: {
      name: 'Dynamic Element Refs',
    },
  },
  {
    path: 'checkout-form',
    loadComponent: () => {
      return import('./checkout-form/checkout-form.component').then(
        (m) => m.CheckoutFormComponent
      );
    },
    data: {
      name: 'Signal Forms & Aria Checkout',
    },
  },
];
