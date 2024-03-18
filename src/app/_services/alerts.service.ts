import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { heatmapDetails } from '../_interfaces/alerts.interface';
import consts from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  token = this.tokenService.getToken();

  constructor(private tokenService: TokenService) {}

  async getAlerts(cityName: string): Promise<number> {
    if (!this.token) return -1;

    const response = await fetch(`${consts.API_BASE_URL}/alerts/count/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        city: cityName,
      }),
    });
    const data = await response.json();
    return data;
  }

  async getAllAlerts(): Promise<heatmapDetails[]> {
    if (!this.token) return [];

    const response = await fetch(`${consts.API_BASE_URL}/alerts/all/`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    });
    const data = await response.json();
    return data;
  }
}
