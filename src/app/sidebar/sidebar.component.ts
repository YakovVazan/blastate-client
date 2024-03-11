import { latLng } from 'leaflet';
import { Component } from '@angular/core';
import { MapService } from '../_services/map.service';
import { LocationService } from '../_services/location.service';
import { SynthesisData } from '../_interfaces/synthesis-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  synthesizedData: SynthesisData[] = [];
  enCities: string[] = [];
  enFilteredCities: string[] = [];
  currentCity: string = '';
  controls = this.mapService.controls;

  constructor(
    private mapService: MapService,
    private locationService: LocationService
  ) {}

  updateCenter(x: number, y: number) {
    this.mapService.updateCenter(x, y);
  }

  increaseZoom() {
    this.mapService.updateZoom(this.controls.zoom + 1);
  }

  decreaseZoom() {
    this.mapService.updateZoom(this.controls.zoom - 1);
  }

  flyToCity(city: string) {
    console.log(this.synthesizedData.find((data) => data.en == city));
    this.currentCity = city;
    this.enFilteredCities = [this.currentCity];
    this.mapService.flyToCity(city);
  }

  handleCitiesDropDownList(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    this.enFilteredCities = this.enCities.filter((city: string) =>
      city.toLowerCase().includes(inputValue.toLowerCase().trim())
    );
  }

  goToCoords() {
    this.currentCity = 'Your location';
    this.locationService
      .getLocation()
      .then((position) =>
        this.mapService.goToCoords(
          position.coords.latitude,
          position.coords.longitude
        )
      );
  }

  resetMap() {
    this.currentCity = '';
    this.enFilteredCities = this.enCities;

    this.mapService.controls.zoom = 5;
    this.mapService.controls.center = latLng(32.0788043, 34.8778926);
  }
}
