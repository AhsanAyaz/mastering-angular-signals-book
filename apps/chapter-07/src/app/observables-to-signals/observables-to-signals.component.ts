import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserObsService } from '../services/user-obs.service';
import { StatsComponent } from '../components/stats/stats.component';
import { UserToSignalService } from '../services/user-to-signal.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, StatsComponent],
  template: `
    <div class="flex flex-col gap-8">
      @let userStatusObs = userStats$ | async; @if (userStatusObs) {
      <section class="bg-base-300 p-4">
        <h1 class="text-3xl text-center">With observables</h1>
        <app-stats [userStats]="userStatusObs" />
      </section>
      }
      <section class="bg-base-300 p-4">
        <h1 class="text-3xl text-center">With signals</h1>
        <app-stats [userStats]="userStats()" primaryStatColor="text-success" />
      </section>
    </div>
  `,
})
export class ObservablesToSignalsComponent {
  private userService = inject(UserObsService);
  private userToSignalService = inject(UserToSignalService);

  // Expose observables to the template
  protected readonly userStats$ = this.userService.userStats$;
  protected readonly userStats = this.userToSignalService.userStats;
}
