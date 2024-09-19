import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesPageComponent } from './vehicles-page.component';
import VehicleMemoryRepository from '../../../repositories/memory/VehicleMemoryRepository';
import { VEHICLE_REPOSITORY_TOKEN } from '../../app.config';
import { VehicleService } from '../../services/vehicle.service';

describe('VehiclesPageComponent', () => {
  let component: VehiclesPageComponent;
  let fixture: ComponentFixture<VehiclesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesPageComponent],
      providers: [
        VehicleService,
        { provide: VEHICLE_REPOSITORY_TOKEN, useClass: VehicleMemoryRepository } // Forneça o token e a implementação
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
