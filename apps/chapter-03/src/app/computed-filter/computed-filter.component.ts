import { Component, computed, signal } from '@angular/core';
import { randFullName } from '@ngneat/falso';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-computed-filter',
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body flex-col gap-4">
        <input
          [(ngModel)]="searchTerm"
          placeholder="search..."
          class="input input-bordered w-full max-w-xs"
        />
        <div>
          <ul class="menu">
            @for (person of filtered(); track $index) {
            <li>
              <a>{{ person }}</a>
            </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  imports: [FormsModule],
})
export class ComputedFilterComponent {
  searchTerm = signal('');
  people = signal(
    randFullName({
      length: 20,
    })
  );

  filtered = computed(() => {
    if (!this.searchTerm().trim()) {
      return this.people();
    }
    return this.people().filter((name) => {
      return name.toLowerCase().includes(this.searchTerm().toLowerCase());
    });
  });
}
