import { Injectable } from '@angular/core';
import L, { Map } from 'leaflet';
import 'leaflet.heat';
import { heatmapDetails } from '../_interfaces/alerts.interface';

@Injectable({
  providedIn: 'root',
})
export class HeatmapService {
  heatmapLayer: any;

  constructor() {}

  async setHeatLayer(map: Map | null, alerts: heatmapDetails[]) {
    const heatPoints: [number, number, number][] = alerts.map((alert) => [
      +alert.lat,
      +alert.lng,
      alert.alerts,
    ]);

    this.heatmapLayer = L.heatLayer(heatPoints, {
      radius: 25,
      gradient: {
        0.2: 'blue',
        0.5: 'green',
        0.8: 'yellow',
        1: 'red',
      },
    });
    
    if (map && this.heatmapLayer) {
      this.heatmapLayer.addTo(map);
    }
  }
}
