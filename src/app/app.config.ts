import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'

import { routes } from './app.routes';
import VehicleMemoryRepository from '../repositories/memory/VehicleMemoryRepository';
import VehicleRepository from '../repositories/contracts/VehicleRepository';

export const VEHICLE_REPOSITORY_TOKEN = new InjectionToken<VehicleRepository>('VehicleRepository');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide:VEHICLE_REPOSITORY_TOKEN, useClass: VehicleMemoryRepository },
  ]
};
