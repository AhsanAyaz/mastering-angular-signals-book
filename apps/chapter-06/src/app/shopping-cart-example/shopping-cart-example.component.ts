// shopping-cart-example.component.ts
import { Component, computed, effect, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';
import {
  CartService,
  ProductsListComponent,
  SearchBoxComponent,
} from '@modern-angular-signals-book/ui-lib';
import { Product, randProduct } from '@ngneat/falso';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-example',
  animations: [
    // Animations for UI feedback
    trigger('countBump', [
      // Animation for the cart count badge
      transition('* => *', [
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(-5px) scale(1.2)', opacity: 0.8 })
        ),
        animate(
          '300ms ease-in',
          style({ transform: 'translateY(0px) scale(1)', opacity: 1 })
        ),
      ]),
    ]),
    // Add other animations like 'pulse' if used
  ],
  imports: [
    SearchBoxComponent,
    ProductsListComponent,
    RouterLink,
    CurrencyPipe,
  ],
  template: `
    <!-- Navbar with Cart Dropdown -->
    <div class="navbar bg-base-200 shadow-sm sticky top-0 z-30">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Shopping cart example</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end z-20">
          <!-- Cart Icon Button with Indicator -->
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <!-- Badge shows item count from service, animated -->
              <span
                class="badge badge-sm indicator-item"
                [@countBump]="animationState()"
              >
                {{ cartService.itemCount() }}
              </span>
            </div>
          </div>
          <!-- Dropdown Content: Cart Summary -->
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-200 z-1 mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-lg font-bold"
                >{{ cartService.itemCount() }} Items</span
              >
              <span class="text-info"
                >Subtotal: {{ cartService.totalPrice() | currency }}</span
              >
              <div class="card-actions">
                <button routerLink="/cart" class="btn btn-primary btn-block">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content Area -->
    <section class="p-4">
      <lib-search-box [(searchQuery)]="searchTerm" />
      <lib-products-list
        (addToCart)="addProductToCart($event)"
        [products]="filteredProducts()"
      />
    </section>
  `,
  styles: [
    `
      /* Basic indicator styles */
    `,
  ], // Minimal styles
})
export class ShoppingCartExampleComponent {
  animationState = signal(0); // State for triggering animation
  searchTerm = signal(''); // Holds the current search query
  cartService = inject(CartService); // Inject the cart service

  // Signal holding the full list of products (using falso for generation)
  products = signal<Product[]>(
    randProduct({ length: 10 }).map((prod) => ({
      ...prod,
      id: self.crypto.randomUUID(),
    })) // Ensure unique IDs
  );

  // Computed signal to filter products based on the searchTerm signal
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.products(); // Return all if search is empty
    return this.products().filter(
      (prod) =>
        prod.title.toLowerCase().includes(term) ||
        prod.description.toLowerCase().includes(term)
    );
  });

  /** Handles the addToCart event from ProductsListComponent */
  addProductToCart(product: Product) {
    this.cartService.addItem(product);
  }

  constructor() {
    // Effect watches the cart item count signal from the service
    effect(() => {
      // Read the signal to establish dependency
      this.cartService.itemCount();
      // Update animation state signal whenever itemCount changes, triggering the animation
      this.animationState.update((v) => v + 1);
    });
  }
}
