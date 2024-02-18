import { Component } from '@angular/core';
import { circle, latLng, polygon, tileLayer } from 'leaflet';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  controls = this.mapService.controls

  constructor(private mapService: MapService) { }

  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18 })
    ],
    zoom: 15,
    center: latLng(32.0788043, 34.8778926)
  }
  layersControl = {
    baseLayers: {
      "openstreetmap": tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18 }),
      "opencyclemap": tileLayer("https://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png", { maxZoom: 18 })
    },
    overlays: {
      "big circle": circle([32.07, 34.87], { radius: 100, color: "red" }),
      "square": polygon([[32.07, 34.87], [32.15, 34.87], [32.15, 34.53], [32.07, 34.53]])
    }
  }
}
