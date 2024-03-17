import { Component, NgZone } from '@angular/core';
import { Map, latLng, tileLayer } from 'leaflet';
import { MapService } from '../_services/map.service';
import consts from '../utils/constant';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  constructor(private mapService: MapService, private ngZone: NgZone) {}

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

  onMapReady(map: Map) {
    this.mapService.onMapReady(map);

    // Subscribe to Leaflet's move event to update the controls
    map.on('move', () => {
      this.ngZone.run(() => {
        const center = map.getCenter();
        this.controls.center.lat = center.lat;
        this.controls.center.lng = center.lng;
      });
    });
  }
}
