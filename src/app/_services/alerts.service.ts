import { Observable } from 'rxjs';
import consts from '../utils/constant';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) {}

  getAllAlertsByCity(city?: string): Observable<number[]> {
    return this.httpClient.post<number[]>(
      `${consts.API_BASE_URL}/alerts/charts_data`,
      { city }
    );
  }

  async getAlertsByCity(cityName: string, date: string): Promise<number> {
    if (!this.tokenService.getToken()) return -1;

    const response = await fetch(`${consts.API_BASE_URL}/alerts/count/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.tokenService.getToken()}`,
      },
      body: JSON.stringify({
        city: cityName,
        targetDate: date,
      }),
    });

    return await response.json();
  }

  async getAlertsByDate(date: string): Promise<any> {
    if (!this.tokenService.getToken()) return [];

    const res = await fetch(`${consts.API_BASE_URL}/alerts/all?date=${date}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    });

    return await res.json();
  }

  async getAllAlerts(): Promise<any> {
    if (!this.tokenService.getToken()) return [];

    const response = await fetch(`${consts.API_BASE_URL}/alerts/all/`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    });

    return await response.json();
  }
}
