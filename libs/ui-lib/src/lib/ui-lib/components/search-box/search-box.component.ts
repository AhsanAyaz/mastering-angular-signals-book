// search-box.component.ts (ui-lib)
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-search-box',
  imports: [FormsModule],
  template: `
    <div class="form-control w-full flex gap-4 flex-col">
      <div class="join">
        <!-- Two-way binding via model() -->
        <input
          id="searchInput"
          type="text"
          placeholder="Search products..."
          class="input input-bordered input-primary join-item w-full focus:outline-none"
          [(ngModel)]="searchQuery"
        />
        <button class="btn btn-primary join-item">
          <!-- Search Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class SearchBoxComponent {
  // Exposes a signal for two-way binding [(searchQuery)]
  searchQuery = model('');
}
