import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlantSelectorComponent } from "./components/plant-selector/plant-selector.component";
import { ListRoomsComponent } from "./components/list-rooms/list-rooms.component";
import { FormRoomComponent } from "./components/form-room/form-room.component";
import { LoadingService } from './services/loading.service';
import { NgxLoadingModule } from 'ngx-loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxLoadingModule,
    RouterOutlet,
    PlantSelectorComponent,
    ListRoomsComponent,
    FormRoomComponent,
    AsyncPipe
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;

  plantCurrent: number = 1;
  rooms: any[] = [];

  updatePlant(plant: any) {
    this.plantCurrent = plant;
  }

  addRoom(room: any) {
    this.rooms.push(room); // Aquí puedes añadir lógica para agregar la sala a la planta actual
  }


}
