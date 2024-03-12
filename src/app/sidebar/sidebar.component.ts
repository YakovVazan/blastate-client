import { latLng } from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../_services/map.service';
import { TokenService } from '../_services/token.service';
import { LocationService } from '../_services/location.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
import API_BASE_URL from '../utils/constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  currentCity: { name: string; alerts: number } = {
    name: '',
    alerts: -1,
  };
  allCities: CitiesInterface[] = [];
  citiesForDropdown: CitiesInterface[] = [];
  controls = this.mapService.controls;

  constructor(
    private mapService: MapService,
    private locationService: LocationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    fetch(`${API_BASE_URL}/cities`, {
      headers: {
        authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          this.citiesForDropdown = this.allCities = data.map(
            (city: CitiesInterface) => {
              return city;
            }
          );
        }
      });
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

  handleChosenCity(city: CitiesInterface) {
    this.currentCity.name = city.hebName;
    this.citiesForDropdown = this.allCities.filter(
      (city) => city.hebName === this.currentCity.name
    );
    this.flyToCity(city);

    this.getAlertsByCity(city.hebName);
  }

  getAlertsByCity(cityName: string) {
    fetch(`${API_BASE_URL}/alerts/count/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.tokenService.getToken()}`,
      },
      body: JSON.stringify({
        city: cityName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.currentCity.alerts = data;
      });
  }

  handleCitiesDropdownList(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    this.citiesForDropdown = this.allCities.filter(
      (city: CitiesInterface) =>
        city.enName.toLowerCase().includes(inputValue.toLowerCase().trim()) ||
        city.hebName.includes(inputValue.trim())
    );
  }

  flyToCity(city: CitiesInterface) {
    this.mapService.flyToCity(city.lat, city.lng);
  }

  goToUserLocation() {
    this.currentCity = { name: '', alerts: -1 };
    this.citiesForDropdown = this.allCities;
    this.locationService
      .getLocation()
      .then((position) =>
        this.mapService.goToCoords(
          position.coords.latitude,
          position.coords.longitude,
          18
        )
      );
  }

  resetMap() {
    this.currentCity = { name: '', alerts: -1 };
    this.citiesForDropdown = this.allCities;

    this.mapService.controls.zoom = 5;
    this.mapService.controls.center = latLng(32.0788043, 34.8778926);
  }
}
