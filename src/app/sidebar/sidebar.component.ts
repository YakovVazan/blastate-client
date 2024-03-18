import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { MapService } from '../_services/map.service';
import { CitiesService } from '../_services/cities.service';
import { AlertsService } from '../_services/alerts.service';
import { LocationService } from '../_services/location.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
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
    private alertsService: AlertsService,
    private citiesService: CitiesService,
    private renderer: Renderer2
  ) {
    this.getCities();
  }

  async getCities() {
    this.citiesForDropdown = this.allCities =
      await this.citiesService.getCities();      
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
    this.setBounds(city);

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

  setBounds(city: CitiesInterface) {
    this.mapService.setBounds(city);
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

    this.mapService.goToCoords(
      consts.BASE_LAT,
      consts.BASE_LNG,
      consts.MIN_ZOOM
    );
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
