import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  constructor(private http: HttpClient) {}

  getCoords(cityName: string): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/search?country=israel&city=${cityName}&format=json`
    );
  }
}
