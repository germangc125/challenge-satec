import { NgFor } from '@angular/common';
import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { LoadingService } from '../../services/loading.service';
import { Plant } from '../../shared/models/plant';

@Component({
  selector: 'app-plant-selector',
  standalone: true,
  imports: [NgFor],
  templateUrl: './plant-selector.component.html',
  styleUrl: './plant-selector.component.scss'
})
export class PlantSelectorComponent implements OnInit {

  plants: Plant[] = [];
  @Output() selectedPlant = new EventEmitter<number>();

  private roomService = inject(RoomService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadPlants();
  }

  selectPlant(plant: any) {
    if (plant) {
      this.selectedPlant.emit(Number(plant.value));
    }
  }

  loadPlants() {
    this.loadingService.show();
    this.roomService.loadPlants().subscribe({
      next: (data: Plant[]) => {
        if (data) {
          this.plants = data;
          if (this.plants.length > 0) {
            this.selectedPlant.emit(this.plants[0].id);

          }
        }else{
          alert("No hay plantas");
        }
        this.loadingService.hide();
      },
      error: (error: string | string[]) => {
        this.loadingService.hide();
        console.error('Error al cargar las plantas', error);
      }
    });
  }
}
