import { CurrencyPipe } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

interface CartItem {
  name: string;
  emoji: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-dynamic-shopping-cart',
  imports: [CurrencyPipe],
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body flex-col gap-4">
        <h2 class="caret-title">Shopping Cart 🛒</h2>
        <div class="flex justify-between">
          <p>Total Items: {{ totalItems() }}</p>
          <p class="max-w-fit">Total Price: {{ totalPrice() | currency }}</p>
        </div>
        <ul class="w-full flex flex-col gap-2">
          @for (item of cart(); track item) {
          <li
            class="text-center w-full grid grid-cols-5 gap-2 items-center justify-between"
          >
            <span class="w-1/3">{{ item.name }} {{ item.emoji }}</span>
            <span>x</span>
            <input
              type="number"
              class="input input-bordered"
              [value]="item.quantity"
              style="width: 60px;"
              (change)="updateQuantity($event, item)"
            />
            <span>{{ item.price * item.quantity | currency }}</span>
            <div class="text-right">
              <button
                class="btn btn-square btn-error btn-sm self-end"
                (click)="remove(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
          }
        </ul>
        <div class="card-actions flex-col">
          <button class="btn btn-outline btn-accent btn-block" (click)="addToCart('apple')">
            Add Apple 🍎
          </button>
          <button class="btn btn-outline btn-accent btn-block" (click)="addToCart('orange')">
            Add Orange 🍊
          </button>
          <button class="btn btn-outline btn-accent btn-block" (click)="addToCart('banana')">
            Add Banana 🍌
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DynamicShoppingCartComponent {
  cart = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.cart().reduce((acc, curr) => acc + curr.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cart().reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  );

  addToCart(fruitName: string) {
    this.cart.update((items) => {
      const existingItem = items.find((i) => i.name === fruitName);
      if (existingItem) {
        return items.map((item) => {
          if (item.name === fruitName) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      const newItem: CartItem = {
        name: fruitName,
        emoji:
          fruitName === 'apple' ? '🍎' : fruitName === 'orange' ? '🍊' : '🍌',
        quantity: 1,
        price: fruitName === 'apple' ? 1 : fruitName === 'orange' ? 1.2 : 0.8,
      };
      return [...items, newItem];
    });
  }

  remove(itemToRemove: CartItem) {
    this.cart.update((items) => items.filter((item) => item !== itemToRemove));
  }

  updateQuantity(event: Event, itemToUpdate: CartItem) {
    this.cart.update((items) =>
      items.map((item) => {
        if (item === itemToUpdate) {
          return {
            ...item,
            quantity: parseInt((event.target as HTMLInputElement).value, 10),
          };
        }
        return item;
      })
    );
  }
}
