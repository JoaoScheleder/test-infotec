import { Observable } from "rxjs";
import Vehicle from "../../models/Vehicle";

export default interface VehicleRepository {
    findAll(): Observable<Vehicle[]>;
    findById(id: number): Observable<Vehicle | undefined>;
    create(vehicle: Vehicle): Observable<Vehicle>;
    delete(id: number): Observable<number>;
    update(id: number, vehicle: Vehicle): Observable<Vehicle>;
}