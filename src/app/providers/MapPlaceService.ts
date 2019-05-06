import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class MapPlaceService {
  public API = 'http://localhost:1337/localhost:8085';
  public PLACES_API = this.API + '/Places';

  constructor(public http: HttpClient) {
  }

  getAll(): any {
    return this.http.get(this.PLACES_API);
  }

  get(id: string) {
    return this.http.get(this.PLACES_API + '/' + id);
  }

  save(place: any): any {
    let result: Object;
    if (place['object_id']) {
      result = this.http.put(place.object_id, place);
    } else {
      result = this.http.post(this.PLACES_API, place);
    }
    return result;
  }

  remove(id: string) {
    return this.http.delete(id);
  }
}
