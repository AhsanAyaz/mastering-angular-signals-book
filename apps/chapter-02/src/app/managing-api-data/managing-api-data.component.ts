import { Component, Injectable, inject, signal } from '@angular/core';

type User = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
};

@Injectable({ providedIn: 'root' })
export class UserService {
  getUser(): User {
    return {
      email: 'john.doe@example.com',
      name: {
        first: 'John',
        last: 'Doe',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    };
  }
}

@Component({
  selector: 'app-managing-api-data',
  imports: [],
  template: `<div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
    <div class="card-body flex-col gap-4 min-h-[360px]">
      <h2 class="card-title">Random User</h2>
      @if(loading()) {
      <div class="flex flex-1 justify-between w-full">
        <span class="loading loading-spinner loading-sm mx-auto"></span>
      </div>
      } @else if(error()) {
      {{ error() }}
      } @else if(user()) {
      <figure>
        <img
          src="{{ user()?.picture?.large }}"
          alt="avatar"
          class="w-32 h-32 mask-square"
        />
      </figure>
      <h2 class="card-title">
        {{ user()?.name?.first }} {{ user()?.name?.last }}
      </h2>
      <p>{{ user()?.email }}</p>
      }
      <div class="card-actions justify-end">
        <button
          (click)="fetchData()"
          [disabled]="loading()"
          class="btn btn-primary"
        >
          Refresh
        </button>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class ManagingApiDataComponent {
  userService = inject(UserService);
  user = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    try {
      const data = this.userService.getUser();
      this.user.set(data);
      this.error.set(null);
    } catch (err) {
      this.error.set((err as Error).message);
      this.user.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
