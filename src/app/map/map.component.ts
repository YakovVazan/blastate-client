import { Component } from '@angular/core';
import { Map, latLng, tileLayer } from 'leaflet';
import { MapService } from '../_services/map.service';
import consts from '../utils/constant';
import { HeatmapService } from '../_services/heatmap.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  controls = this.mapService.controls;
  previousZoom: number = 0;
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
    private heatmapService: HeatmapService
  ) {}

  onMapReady(map: Map) {
    this.previousZoom = map.getZoom();

    this.mapService.onMapReady(map);

    map.on('move', () => {
      this.mapService.zone(map);
    });

    map.on('zoomstart', () => {
      this.previousZoom = map.getZoom();
    });

    map.on('zoomend', () => {
      this.heatmapService.updateRadius(map, this.previousZoom);
      this.heatmapService.heatmapLayer?.setOptions({
        radius: this.heatmapService.radius,
      });
    });
  }
}
