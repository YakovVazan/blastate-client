import { Injectable } from '@angular/core';
import { Map, circle, latLng, polygon, tileLayer } from 'leaflet';
import { CoordsService } from './coords.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map | null = null;

  constructor(private coordsService: CoordsService) {}

  controls = {
    zoom: 5,
    center: latLng(32.0788043, 34.8778926),
  };

  layersControl = {
    baseLayers: {
      openstreetmap: tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18 }
      ),
      opencyclemap: tileLayer(
        'https://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png',
        { maxZoom: 18 }
      ),
    },
    overlays: {
      'big circle': circle([32.07, 34.87], { radius: 100, color: 'red' }),
      square: polygon([
        [32.07, 34.87],
        [32.15, 34.87],
        [32.15, 34.53],
        [32.07, 34.53],
      ]),
    },
  };

  updateZoom(x: number) {
    this.controls.zoom = x;
  }

  updateCenter(x: number, y: number) {
    this.controls.center = latLng(x, y);
  }

  flyToCity(city: string) {
    this.coordsService.getCoords(city).subscribe({
      next: (data) => {
        data.length > 0 && this.goToCoords(data[0].lat, data[0].lon);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  goToCoords(lat: number, lon: number) {
    this.map?.flyTo(latLng(lat, lon), 13);
  }

  onMapReady(map: Map) {
    this.map = map;
  }
}
