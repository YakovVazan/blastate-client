import L from 'leaflet';
import { Injectable, NgZone } from '@angular/core';
import { Map, circle, latLng, polygon, tileLayer } from 'leaflet';
import { TokenService } from './token.service';
import { AlertsService } from './alerts.service';
import { HeatmapService } from './heatmap.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
import consts from '../utils/constant';

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

  constructor(
    private alertsService: AlertsService,
    private heatmapService: HeatmapService,
    private tokenService: TokenService,
    private ngZone: NgZone
  ) {}

  async addHeatLayer(date?: string): Promise<number> {
    let sumAlerts: number = 0; 

    if (date) {
      await this.alertsService.getAlertsByDate(date).then((alerts) => {
        sumAlerts = this.updateHeatLayer(alerts);
      });
    } else {
      await this.alertsService.getAllAlerts().then((alerts) => {
        sumAlerts = this.updateHeatLayer(alerts);
      });
    }

    return sumAlerts;
  }

  updateHeatLayer(alerts: any) {
    this.removeOldHeatLayer();
    this.addNewHeatLayer(alerts);
    return alerts.sumAlerts;
  }

  removeOldHeatLayer() {
    this.heatmapService.heatmapLayer &&
      this.map?.removeLayer(this.heatmapService.heatmapLayer);
  }

  addNewHeatLayer(alerts: any) {
    this.tokenService.getToken() &&
      this.heatmapService.setHeatLayer(this.map, alerts.countsByCity);
  }

  updateZoom(x: number) {
    this.controls.zoom = x;
  }

  updateCenter(latitude: number, longitude: number) {
    this.controls.center = latLng(latitude, longitude); 
  }

  setBounds(city: CitiesInterface) {
    const southWest = L.latLng(+city.boundingBox[0], +city.boundingBox[2]);
    const northEast = L.latLng(+city.boundingBox[1], +city.boundingBox[3]);
    const bounds = L.latLngBounds(southWest, northEast);
    const center = bounds.getCenter();

    this.goToCoords(center.lat, center.lng, undefined, bounds);
  }

  goToCoords(lat: number, lon: number, zoom?: number, bounds?: L.LatLngBounds) {
    this.map?.setView(latLng(lat, lon), zoom);
    bounds && this.map?.fitBounds(bounds);
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  zone(map: Map) {
    this.ngZone.run(() => {
      const center = map.getCenter();
      this.controls.center.lat = center.lat;
      this.controls.center.lng = center.lng;
    });
  }
}
