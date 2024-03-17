import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { MapService } from '../_services/map.service';
import { TokenService } from '../_services/token.service';
import { LocationService } from '../_services/location.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
import { AlertsService } from '../_services/alerts.service';
import consts from '../utils/constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnDestroy {
  currentCity: { name: string; alerts: number } = {
    name: '',
    alerts: -1,
  };
  allCities: CitiesInterface[] = [];
  citiesForDropdown: CitiesInterface[] = [];
  controls = this.mapService.controls;
  isSmallScreen: boolean = window.innerWidth <= 767;
  wasSmallScreen: boolean = this.isSmallScreen;
  maxZoom: number = consts.MAX_ZOOM;
  minZoom: number = consts.MIN_ZOOM;

  constructor(
    private mapService: MapService,
    private locationService: LocationService,
    private tokenService: TokenService,
    private alertsService: AlertsService,
    private renderer: Renderer2
  ) {
    this.getCities();
  }

  getCities() {
    fetch(`${consts.API_BASE_URL}/cities`, {
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

  updateCenter(latitude: number, longitude: number) {
    this.mapService.updateCenter(latitude, longitude);
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

  async getAlertsByCity(cityName: string) {
    this.currentCity.alerts = await this.alertsService.getAlerts(cityName);
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
          consts.MAX_ZOOM
        )
      );
  }

  resetMap() {
    this.currentCity = { name: '', alerts: -1 };
    this.citiesForDropdown = this.allCities;

    this.mapService.updateZoom(consts.MIN_ZOOM);
    this.mapService.updateCenter(consts.BASE_LAT, consts.BASE_LNG);
  }

  addResizeListener() {
    this.renderer.listen(window, 'resize', () => {
      this.isSmallScreen = window.innerWidth <= 767;
      if (this.isSmallScreen !== this.wasSmallScreen) {
        this.wasSmallScreen = this.isSmallScreen;
      }
    });
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }
}
