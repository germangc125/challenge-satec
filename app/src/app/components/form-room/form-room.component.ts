import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { RoomService } from '../../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../shared/models/room';

@Component({
  selector: 'app-form-room',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-room.component.html',
  styleUrl: './form-room.component.scss'
})
export class FormRoomComponent implements OnInit {

  private roomService = inject(RoomService);
  private toastrService = inject(ToastrService);


  roomForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    capacity: new FormControl('', [Validators.required, Validators.min(0)]),
    occupation: new FormControl('', [Validators.required, Validators.min(0)]),
    idPlant: new FormControl('', [Validators.required])
  });

  //@Output() room = new EventEmitter<any>();
  isEdit: boolean = false;


  constructor(private readonly _modalReference: ModalReference<any>) {
    console.log(this._modalReference.config);
  }

  ngOnInit(): void {
    this.roomForm.patchValue(this._modalReference.config.model.room);
    if (this.roomForm.value.id) {
      this.isEdit = true;
    } else {
      this.roomForm.reset();
      this.roomForm.controls["id"].setValue("5");
      this.roomForm.controls["idPlant"].setValue(this._modalReference.config.model.idPlant);
    }
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const room: Room = {
        id: Number(this.roomForm.value.id),
        name: String(this.roomForm.value.name),
        capacity: Number(this.roomForm.value.capacity),
        occupation: Number(this.roomForm.value.occupation),
        idPlant: Number(this.roomForm.value.idPlant)
      };

      if (!this.isEdit) {
        this.roomService.addNewRoom(room).subscribe({
          next: (data: any) => {
            if (data) {
              this.toastrService.success('Se ha creado la sala satisfactoriamente');
            }
            this._modalReference.closeSuccess(data);
          },
          error: (error: string | string[]) => {
            this.toastrService.error('Error al crear la nueva sala');
            console.error(error);
          }
        });
      }
      else {
        this.roomService.updateRoom(room).subscribe({
          next: (data: any) => {
            if (data) {
              this.toastrService.success('Se ha actualizado la sala satisfactoriamente');
            }
            this._modalReference.closeSuccess(this.roomForm.value);
          },
          error: (error: string | string[]) => {
            this.toastrService.error('Error al actualizar la sala');
            console.error(error);
          }
        });
      }
    }
  }
}
