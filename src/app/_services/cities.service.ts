import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
import consts from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  cities: CitiesInterface[] = [];
  currentCity: { name: string; alerts: number } = {
    name: consts.DEFAULT_CITY_NAME,
    alerts: -1,
  };

  constructor(private tokenService: TokenService) {}

  async getCities(): Promise<CitiesInterface[]> {
    try {
      const token = this.tokenService.getToken();
      if (!token) return [];

      const response = await fetch(`${consts.API_BASE_URL}/cities`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.statusCode) {
        this.cities = data.map((city: CitiesInterface) => city);
        return this.cities;
      } else {
        throw new Error('Failed to fetch cities');
      }
    } catch (error) {
      throw new Error('Failed to fetch cities');
    }
  }

  setCurrentCity(name: string, alerts: number) {
    this.currentCity = { name, alerts };
  }
}
