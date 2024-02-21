import { Injectable } from '@angular/core';
import { Map, circle, latLng, polygon, tileLayer } from 'leaflet';
import cities from './cities';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map | null = null

  controls = {
    zoom: 5,
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

  updateZoom(x: number) {
    this.controls.zoom = x
  }

  updateCenter(x: number, y: number) {
    this.controls.center = latLng(x, y)
  }

  flyToCity(city: keyof typeof cities) {
    const point: number[] = cities[city]

    this.map?.flyTo(latLng(point[0], point[1]), point[2])
  }

  onMapReady(map: Map, layer: any) {
    this.map = map
    console.log(this.map, { map });
    // map.on({
    //   mousemove: (e: any) => {
    //     layer.addLatLng(e.latlng)
    //   }
    // })
  }
}
