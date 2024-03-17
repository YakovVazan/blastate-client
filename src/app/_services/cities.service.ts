import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { CitiesInterface } from '../_interfaces/cities.interface';
import consts from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  cities: CitiesInterface[] = [];

  constructor(private tokenService: TokenService) {}

  async getCities(): Promise<CitiesInterface[]> {
    try {
      const response = await fetch(`${consts.API_BASE_URL}/cities`, {
        headers: {
          authorization: `Bearer ${this.tokenService.getToken()}`,
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
}
