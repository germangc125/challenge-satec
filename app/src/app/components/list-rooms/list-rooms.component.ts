import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { FormRoomComponent } from '../form-room/form-room.component';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../shared/models/room';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.scss'
})
export class ListRoomsComponent implements OnChanges {

  @Input() selectedPlant!: number;
  rooms: any[] = []; // Aquí irán las salas de la planta seleccionada


  private roomService = inject(RoomService);
  private modalService = inject(ModalService);
  private toastrService = inject(ToastrService);


  ngOnChanges() {
    this.loadRoomsByPlant(this.selectedPlant);
  }

  loadRoomsByPlant(selectedPlant: number) {
    this.roomService.loadRoomsByPlant(selectedPlant).subscribe({
      next: (data: Room[]) => {
        if (data) {
          this.rooms = data;
        } else {
          alert("No hay salas asociadas a la  planta seleccionada");
        }
      },
      error: (error: string | string[]) => {
        this.toastrService.success('Error al cargar las salas segun la planta seleccionada' + error);
      }
    });

  }

  deleteRoom(room: Room) {
    this.roomService.removeRoom(room).subscribe({
      next: (data: Room[]) => {
        if (data) {
          this.rooms = data;
        } else {
          alert("No hay salas asociadas a la  planta seleccionada");
        }
      },
      error: (error: string | string[]) => {
        this.toastrService.error('Error al eliminar la sala con nombre room' + room.name);
        console.error(error);
      }
    });
  }

  confirmDeleteRoom(room: Room){
    this.modalService.show<any>(ConfirmComponent,{
      title: 'Confirmar Eliminación',
      model: room,
    }).result().subscribe(res => {
      if(res== "ok"){
        this.deleteRoom(room);
      }
    })
  }

  openModalRoom(room: Room | null) {
    this.modalService.show<any>(FormRoomComponent, {
      title: `${room ? 'Editar' : "Nueva"} Sala`,
      model: {room: room, idPlant: this.selectedPlant}
    }).result().subscribe(data => {
      if(data){
        this.rooms = data.filter( (i: Room) => i.idPlant === this.selectedPlant)
      }
    })
  }
}
