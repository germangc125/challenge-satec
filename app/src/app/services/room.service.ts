import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Api } from '../helpers/api';
import { Room } from '../shared/models/room';
import { Plant } from '../shared/models/plant';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private api: Api) { }

  loadPlants(): Observable<Plant[]> {
    return this.api.get('plants');
  }

  loadRoomsByPlant(idPlant: number): Observable<Room[]> {
    return this.api.get('rooms').pipe(
      map((rooms: Room[]) => rooms.filter(room => room.idPlant === idPlant))
    );
  }

  addNewRoom(room: Room): Observable<Room[]> {
    return this.api.post('rooms', JSON.stringify(room));
  }

  updateRoom(room: Room): Observable<Room> {
    return this.api.put('rooms/' + room.id, room);
  }

  removeRoom(room: Room): Observable<any>{
    return this.api.delete('rooms/' + room.id);
  }



}
