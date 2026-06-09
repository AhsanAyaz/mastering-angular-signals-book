import { Component, computed, linkedSignal, signal } from '@angular/core';
import { randFullName, seed } from '@ngneat/falso';
import { FormsModule } from '@angular/forms';
import { NgClass, SlicePipe } from '@angular/common';
seed('ng-signals-book');

@Component({
  selector: 'app-linked-signal',
  imports: [FormsModule, SlicePipe, NgClass],
  templateUrl: './linkedSignal.component.html',
  styleUrl: './linkedSignal.component.scss',
})
export class LinkedSignalComponent {
  searchTerm = signal('');
  resultsLimit = signal(5);
  people = signal(
    randFullName({
      length: 20,
    })
  );
  resultsPage = linkedSignal({
    source: () => {
      this.searchTerm();
    },
    computation: () => {
      return 0;
    },
  });
  filtered = computed(() => {
    if (!this.searchTerm().trim()) {
      return this.people();
    }
    return this.people().filter((name) => {
      return name.toLowerCase().includes(this.searchTerm().toLowerCase());
    });
  });
  pages = computed(() => {
    return Array(Math.ceil(this.filtered().length / this.resultsLimit())).fill(
      0
    );
  });

  changePage(page: number) {
    this.resultsPage.set(page);
  }
}
