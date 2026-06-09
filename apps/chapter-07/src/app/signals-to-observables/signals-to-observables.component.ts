import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { SensorService } from './sensor.service';

@Component({
  selector: 'app-signals-to-observables',
  imports: [AsyncPipe, DecimalPipe],
  template: `
    <div class="flex flex-col gap-8">
      <section class="bg-base-300 p-4">
        <h1 class="text-3xl text-center mb-4">Temperature Sensor Monitor</h1>

        <!-- Raw Signal Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Raw Sensor Data (Signal)</h2>
          <p class="text-4xl font-bold">
            {{ sensorService.rawSensor() | number : '1.1-1' }}°C
          </p>
        </div>

        <!-- Stabilized Observable Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Stabilized Reading (Observable)</h2>
          <p class="text-4xl font-bold text-primary">
            {{ sensorService.stabilizedTemp$ | async | number : '1.1-1' }}°C
          </p>
          <p class="text-sm text-base-content/70">Debounced 500ms</p>
        </div>

        <!-- Average Observable Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Rolling Average (Observable)</h2>
          <p class="text-4xl font-bold text-secondary">
            {{ sensorService.averageTemp$ | async | number : '1.1-1' }}°C
          </p>
          <p class="text-sm text-base-content/70">Last 5 readings</p>
        </div>

        <!-- Critical Alert -->
        @if (sensorService.criticalAlert$ | async; as alert) {
        <div class="bg-error text-error-content p-4 rounded-lg text-center">
          <p class="text-xl">{{ alert }}</p>
        </div>
        }
      </section>
    </div>
  `,
})
export class SignalsToObservablesComponent {
  protected readonly sensorService = inject(SensorService);
}
