import { Component } from '@angular/core';
import { Map, latLng, tileLayer } from 'leaflet';
import { MapService } from '../_services/map.service';
import consts from '../utils/constant';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  controls = this.mapService.controls;
  layersControl = this.mapService.layersControl;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: consts.MAX_ZOOM,
        minZoom: consts.MIN_ZOOM,
      }),
    ],
    zoom: 15,
    center: latLng(consts.BASE_LAT, consts.BASE_LNG, 17.87),
  };

  constructor(
    private mapService: MapService,
  ) {}

  onMapReady(map: Map) {
    this.mapService.onMapReady(map);

    map.on('move', () => {
      this.mapService.zone(map);
    });
  }
}
