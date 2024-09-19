import { Injectable, Inject } from '@angular/core';
import VehicleRepository from '../../repositories/contracts/VehicleRepository';
import { VEHICLE_REPOSITORY_TOKEN } from '../app.config';
import Vehicle from '../../models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(@Inject(VEHICLE_REPOSITORY_TOKEN) private vehicleRepository : VehicleRepository) { }

  findAll(){
    return this.vehicleRepository.findAll();
  }

  findById(id : number){
    return this.vehicleRepository.findById(id);
  }

  create(vehicle : Vehicle){
    return this.vehicleRepository.create(vehicle);
  }

  delete(id : number){
    return this.vehicleRepository.delete(id);
  }

  update(id : number, vehicle : any){
    return this.vehicleRepository.update(id, vehicle);
  }
}
