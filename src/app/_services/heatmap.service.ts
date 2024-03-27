import { Injectable } from '@angular/core';
import L, { Map } from 'leaflet';
import 'leaflet.heat';
import { heatmapDetails } from '../_interfaces/alerts.interface';

@Injectable({
  providedIn: 'root',
})
export class HeatmapService {
  heatmapLayer: L.HeatLayer | null = null;
  radius: number = 25;

  constructor() {}

  async setHeatLayer(map: Map | null, alerts: heatmapDetails[]) {
    const heatPoints: [number, number, number][] = alerts.map((alert) => [
      +alert.lat,
      +alert.lng,
      alert.alerts,
    ]);

    this.heatmapLayer = L.heatLayer(heatPoints, {
      radius: this.radius,
      gradient: {
        0.1: 'yellow',
        0.4: 'orange',
        0.7: 'coral',
        1: 'red',
      },
    });

    if (map && this.heatmapLayer) {
      this.heatmapLayer.addTo(map);
    }
  }
}
