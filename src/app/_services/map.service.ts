import { Injectable } from '@angular/core';
import { Map, circle, latLng, polygon, tileLayer } from 'leaflet';
import consts from '../utils/constant';
import { AlertsService } from './alerts.service';
import { HeatmapService } from './heatmap.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map | null = null;
  controls = {
    zoom: consts.MIN_ZOOM,
    center: latLng(consts.BASE_LAT, consts.BASE_LNG),
  };

  layersControl = {
    baseLayers: {
      openstreetmap: tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: consts.MAX_ZOOM }
      ),
      opencyclemap: tileLayer(
        'https://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png',
        { maxZoom: consts.MAX_ZOOM }
      ),
    },
    overlays: {
      'big circle': circle([32.07, 34.87], { radius: 100, color: 'red' }),
      square: polygon([
        [32.07, 34.87],
        [32.15, 34.87],
        [32.15, 34.53],
        [32.07, 34.53],
      ]),
    },
  };

  constructor(private alertsService: AlertsService, private heatmapService: HeatmapService) {
    this.alertsService.getAllAlerts().then((alerts) => {
      this.heatmapService.setHeatLayer(this.map, alerts)
    })
  }

  updateZoom(x: number) {
    this.controls.zoom = x;
  }

  updateCenter(latitude: number, longitude: number) {
    this.controls.center = latLng(latitude, longitude);
  }

  flyToCity(lat: string, lng: string) {
    this.goToCoords(parseFloat(lat), parseFloat(lng));
  }

  goToCoords(lat: number, lon: number, zoom: number = 13) {
    this.map?.setView(latLng(lat, lon), zoom);
  }

  onMapReady(map: Map) {
    this.map = map;
  }
}
