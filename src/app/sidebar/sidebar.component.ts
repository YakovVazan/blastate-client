import { Component } from '@angular/core';
import { MapService } from '../_services/map.service';
import cities from '../_services/cities';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private mapService: MapService) { }
  
  controls = this.mapService.controls

  updateCenter(x: number, y: number) {
    this.mapService.updateCenter(x, y)
  }

  increaseZoom() {
    this.mapService.updateZoom(this.controls.zoom + 1)
  }

  decreaseZoom() {
    this.mapService.updateZoom(this.controls.zoom - 1)
  }

  flyToCity(city: keyof typeof cities) {
    this.mapService.flyToCity(city)
  }
}
