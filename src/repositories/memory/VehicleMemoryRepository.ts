import { Observable, of } from "rxjs";
import Vehicle from "../../models/Vehicle";
import VehicleRepository from "../contracts/VehicleRepository";

export default class VehicleMemoryRepository implements VehicleRepository{

    vehicles : Vehicle[] = [];

    findAll() : Observable<Vehicle[]> {
        return of(this.vehicles)
    }

    findById(id : number) : Observable<Vehicle | undefined>{
        return of(this.vehicles.find(vehicle => vehicle.id === id));
    }

    create(vehicle : any) : Observable<Vehicle>{
        this.vehicles.push(vehicle);
        vehicle.id = this.findMaxId() + 1;
        console.log("VehicleMemoryRepository.create", vehicle);
        return of(vehicle);
    }

    delete(id : number) : Observable<number>{
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        return of(id);
    }

    update(id: number, vehicle: Vehicle): Observable<Vehicle> {
        const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
        this.vehicles[index] = vehicle;
        return of(vehicle);
    }

    private findMaxId(){
        return this.vehicles.reduce((maxId, vehicle) => vehicle.id! > maxId ? vehicle.id! : maxId, 0);
    }
}