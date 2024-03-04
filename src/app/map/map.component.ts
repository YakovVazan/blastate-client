import { Component } from '@angular/core';
import { Map, latLng, tileLayer } from 'leaflet';
import { MapService } from '../_services/map.service';
import { HeatmapService } from '../_services/heatmap.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor(
    private mapService: MapService,
    private heatmapService: HeatmapService
  ) { }

  controls = this.mapService.controls
  layersControl = this.mapService.layersControl

  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18 }),
      this.heatmapService.heatmapLayer
    ],
    zoom: 15,
    center: latLng(32.0788043, 34.8778926, 17.87)
  }

  onMapReady(map: Map) {
    this.mapService.onMapReady(map, this.heatmapService.heatmapLayer)
  }
}
