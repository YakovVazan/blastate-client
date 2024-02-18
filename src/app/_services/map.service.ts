import { Injectable } from '@angular/core';
import { latLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  controls = {
    zoom: 5,
    center: latLng(32.0788043, 34.8778926)
  }

  updateZoom(x: number) {
    this.controls.zoom = x
  }

  updateCenter(x: number, y: number) {
    this.controls.center = latLng(x, y)
  }
}
