import { Component, OnInit } from '@angular/core';
import { MapService } from '../_services/map.service';
import { CitiesService } from '../_services/cities.service';
import { LocationService } from '../_services/location.service';
import { latLng } from 'leaflet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  cities: [] = [];
  filteredCities: string[] = [];
  currentCity: string = '';
  controls = this.mapService.controls;

  constructor(
    private mapService: MapService,
    private citiesService: CitiesService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.citiesService.getCities('Israel').subscribe({
      next: (data) => {
        this.filteredCities = this.cities = data.data.map((city: string) =>
          city.charAt(0) === '`' ? city.substring(1) : city
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleCitiesDropDownList(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    this.filteredCities = this.cities.filter((city: string) =>
      city.toLowerCase().includes(inputValue.toLowerCase().trim())
    );
  }

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
    this.currentCity = city;
    this.mapService.flyToCity(city);
  }

  goToCoords() {
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
    this.mapService.controls.zoom = 5;
    this.mapService.controls.center = latLng(32.0788043, 34.8778926);
  }
}
