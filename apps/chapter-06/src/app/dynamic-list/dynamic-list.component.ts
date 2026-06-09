// dynamic-list.component.ts
import {
  Component,
  effect,
  viewChild, // For single element queries
  viewChildren, // For multiple element queries
  ElementRef, // Type for element references
  signal,
  afterNextRender, // Lifecycle hook for post-render actions
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngNativeValidate

@Component({
  selector: 'app-dynamic-list',
  imports: [FormsModule],
  template: `
    <div class="card bg-base-200 shadow-xl p-4 max-w-lg mx-auto">
      <!-- Form for adding items -->
      <form class="flex gap-2 mb-4" (submit)="addItem()" ngNativeValidate>
        <!-- Query input with viewChild -->
        <input
          #newItemInput
          name="newItemInputVal"
          type="text"
          required
          class="input input-bordered flex-1"
          placeholder="Add new item"
        />
        <!-- Query button with viewChild -->
        <button #submitButton class="btn btn-primary" type="submit">
          Add Item
        </button>
      </form>

      <!-- List rendering -->
      <ul class="menu bg-base-100 rounded-box gap-1">
        <!-- Query *inner divs* with viewChildren -->
        @for(item of items(); track item; let idx = $index) {
        <li #listItems [attr.data-item-value]="item">
          <!-- Outer list item -->
          <!-- Inner div contains content and is queried -->
          <div class="list-item-inner flex justify-between items-center">
            <span>{{ item }}</span>
            <button
              class="btn btn-sm btn-ghost text-error"
              (click)="removeItem(idx)"
            >
              ✕
            </button>
          </div>
        </li>
        } @empty {
        <li class="text-center text-gray-500 p-2">List is empty.</li>
        }
      </ul>

      <!-- Item count display -->
      <div class="mt-4 text-sm text-gray-500">
        Total items: {{ items().length }}
      </div>
    </div>
  `,
  styles: [
    `
      /* Style applied to the inner div for highlighting */
      .list-item-inner.new-item-highlight {
        transition: background-color 0.5s ease-out;
        background-color: var(--color-primary);
        border-radius: var(--rounded-btn, 0.5rem);
        > * {
          color: var(--color-primary-content);
        }
      }
    `,
  ],
})
export class DynamicListComponent {
  // --- Signal-based element references ---
  submitButton = viewChild<ElementRef<HTMLButtonElement>>('submitButton');
  // Signal for the list of *inner div* elements marked with #listItems.
  listItems = viewChildren<ElementRef<HTMLDivElement>>('listItems'); // Querying DIVs now
  newItemInput = viewChild<ElementRef<HTMLInputElement>>('newItemInput');

  // --- Component state signals ---
  items = signal<string[]>(['Initial Item 1', 'Initial Item 2']);
  isProcessing = signal(false); // Example state for button disable

  // --- Computed signal for animation ---
  // Finds *inner div* elements that haven't been animated.
  itemsToAnimate = computed(() =>
    this.listItems().filter(
      (elRef) => !elRef.nativeElement.hasAttribute('data-animated')
    )
  );

  constructor() {
    // --- Effects ---

    // Effect 1: Manage submit button's disabled state.
    effect(() => {
      const buttonRef = this.submitButton();
      if (buttonRef) {
        buttonRef.nativeElement.disabled = this.isProcessing();
      }
    });

    // Effect 2: Highlight newly added list item divs.
    effect(() => {
      const newlyAddedDivRefs = this.itemsToAnimate(); // Get refs to new inner divs
      console.log('New list item divs detected:', newlyAddedDivRefs.length);

      if (newlyAddedDivRefs.length > 0) {
        // Apply highlight class to the inner divs
        newlyAddedDivRefs.forEach((elRef) => {
          const innerDiv =
            elRef.nativeElement.querySelector('.list-item-inner');
          if (innerDiv) {
            innerDiv.classList.add('new-item-highlight');
          }
          // Mark as processed
          elRef.nativeElement.setAttribute('data-animated', 'true');
        });

        // Remove highlight after a short delay
        setTimeout(() => {
          newlyAddedDivRefs.forEach((elRef) => {
            const innerDiv =
              elRef.nativeElement.querySelector('.list-item-inner');
            if (innerDiv) {
              innerDiv.classList.remove('new-item-highlight');
            }
          });
        }, 500);
      }
    });

    // --- Lifecycle Hooks ---
    // Set focus on the input after the initial render.
    afterNextRender(() => {
      this.newItemInput()?.nativeElement.focus();
    });
  }

  // --- Component Methods ---
  addItem() {
    const inputElement = this.newItemInput()?.nativeElement;
    if (!inputElement?.value) return;
    // this.isProcessing.set(true); // Simulate processing if needed
    this.items.update((currentItems) => [...currentItems, inputElement.value]);
    inputElement.value = '';
    inputElement.focus();
    // setTimeout(() => this.isProcessing.set(false), 300);
  }

  removeItem(indexToRemove: number) {
    this.items.update((currentItems) =>
      currentItems.filter((_, index) => index !== indexToRemove)
    );
  }
}
