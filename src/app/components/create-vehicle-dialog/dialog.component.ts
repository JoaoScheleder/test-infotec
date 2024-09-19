import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{
  @Input() title: string = 'Create Vehicle';
  @Input() data: any = {};

  @Output() dialogClose = new EventEmitter<void>();
  @Output() dialogSubmit = new EventEmitter<any>();


  createVehicleForm = new FormGroup({
    placa: new FormControl(''),
    chassi: new FormControl(''),
    renavam: new FormControl(''),
    modelo: new FormControl(''),
    marca: new FormControl(''),
    ano: new FormControl()
  })

  constructor(){}

  ngOnInit(): void {
    this.createVehicleForm.patchValue(this.data.vehicleData)
  }


  submit() {
    const id = this.data.vehicleData.id;
    this.data = this.createVehicleForm.value;
    this.data.id = id;
    this.dialogSubmit.emit(this.data);
    this.close();
  }

  close() {
    this.dialogClose.emit();
  }
}
