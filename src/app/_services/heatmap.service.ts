import { Injectable } from '@angular/core';
import L from 'leaflet';
import "leaflet.heat/dist/leaflet-heat.js"
import points from './points';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {
  // @ts-ignore
  heatmapLayer = L.heatLayer(points, {
    radius: 25, gradient: {
      0.2: 'yellow', 0.5: 'orange', 1: 'red'
    }
  })
}
