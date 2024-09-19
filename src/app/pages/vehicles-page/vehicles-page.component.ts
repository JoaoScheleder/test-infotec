import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { DialogComponent } from '../../components/create-vehicle-dialog/dialog.component';
import Vehicle from '../../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { delay } from 'rxjs';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { ToastService } from '../../services/toast.service';



type VehicleKey = keyof Vehicle;

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [KeyValuePipe, DialogComponent],
  templateUrl: './vehicles-page.component.html',
  styleUrl: './vehicles-page.component.css'
})
export class VehiclesPageComponent implements OnInit {

  columns : string[] = ['Id', 'Placa', 'Chassi', 'Renavam', 'Modelo', 'Marca', 'Ano', 'Ações'];
  columns_order : VehicleKey[] = ['id','placa','chassi','renavam','modelo','marca','ano']
  vehicles : Vehicle[] = []

  is_loading : boolean = true;

  constructor(private dialogService : DialogService, private vehicleService : VehicleService, private toastService : ToastService){}

  ngOnInit(): void {
    this.readAllVehicles();
  }

  createVehicle(vehicle : Vehicle){
    this.vehicleService.create(vehicle).subscribe({
      next: (vehicle) => {
        this.vehicles.push(vehicle);
        console.log('Created')
      },
      error: (error) => {
        console.error('Error creating vehicle:', error);
      }
    });
  }

  openCreateVehicleDialog() {
    const dialogRef = this.dialogService.openDialog(DialogComponent, 'Cadastrar Veículo', { vehicleData : {} });
    dialogRef.instance.dialogSubmit.subscribe((data: Vehicle) => {
      this.createVehicle(data)
      this.dialogService.closeDialog(dialogRef);
    });
    dialogRef.instance.dialogClose.subscribe(() => {
      this.dialogService.closeDialog(dialogRef);
    });
  }


  readAllVehicles(){
    this.vehicleService.findAll().pipe(delay(1000)).subscribe({
      next: (vehicles) => {
        // create copy of vehicles array instead of the below for memory
        // this.vehicles = vehicles;
        this.vehicles = vehicles.map(vehicle => {
          return {...vehicle};})
      },
      error: (error) => {
        console.error('Error loading vehicles:', error);
      },
      complete: () => {
        this.is_loading = false;
      }
    });
  }

  updateVehicle(vehicle : Vehicle){
    this.vehicleService.update(vehicle.id!, vehicle).subscribe({
      next: (vehicle) => {
        console.log(vehicle)
        this.vehicles = this.vehicles.map(v => v.id === vehicle.id ? vehicle : v);
        console.log(this.vehicles)
        this.toastService.open('Operação realizada com sucesso!', 5000, 'sucesso');
        console.log('Updated')
      },
      error: (error) => {
        console.error('Error updating vehicle:', error);
      }
    });
  }

  openUpdateVehicleDialog(vehicle : Vehicle){
    const dialogRef = this.dialogService.openDialog(DialogComponent, 'Atualizar Veículo', { vehicleData: vehicle });
    dialogRef.instance.dialogSubmit.subscribe((data: Vehicle) => {
      console.log(data)
      this.updateVehicle(data)
      this.dialogService.closeDialog(dialogRef);
    });
    dialogRef.instance.dialogClose.subscribe(() => {
      this.dialogService.closeDialog(dialogRef);
    });
  }

  deleteVehicle(id : number){
    this.vehicleService.delete(id).subscribe({
      next: (id) => {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        this.toastService.open('Operação realizada com sucesso!', 5000, 'sucesso');
        console.log('Deleted')
      },
      error: (error) => {
        console.error('Error deleting vehicle:', error);
      }
    });
  }

  openDeleteDialog(id : number){
    const dialogRef = this.dialogService.openDialog(DeleteDialogComponent, 'Deletar Veículo', { id : id });
    dialogRef.instance.dialogSubmit.subscribe((data: number) => {
      this.deleteVehicle(data)
      this.dialogService.closeDialog(dialogRef);
    });
    dialogRef.instance.dialogClose.subscribe(() => {
      this.dialogService.closeDialog(dialogRef);
    });
  }
}
