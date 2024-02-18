import { Component } from '@angular/core';
import { MapService } from '../_services/map.service';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  controls = this.mapService.controls

  updateCenter(x: number, y: number) {
    this.mapService.updateCenter(x, y)
  }

  constructor(private mapService: MapService) { }

  increaseZoom() {
    this.mapService.updateZoom(this.controls.zoom + 1)
  }

  decreaseZoom() {
    this.mapService.updateZoom(this.controls.zoom - 1)
  }
}
