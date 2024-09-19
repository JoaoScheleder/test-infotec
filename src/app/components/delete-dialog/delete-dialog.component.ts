import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  @Input() title: string = 'Create Vehicle';
  @Input() data: any = {};

  @Output() dialogClose = new EventEmitter<void>();
  @Output() dialogSubmit = new EventEmitter<any>();

  constructor(){}
  submit() {
    this.dialogSubmit.emit(this.data.id);
    this.close();
  }

  close() {
    this.dialogClose.emit();
  }
}
