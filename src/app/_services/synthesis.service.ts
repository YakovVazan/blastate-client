import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CitiesService } from './cities.service';
import { AlertsService } from './alerts.service';
import { SynthesisData } from '../_interfaces/synthesis-data';

@Injectable({
  providedIn: 'root',
})
export class SynthesisService {
  synthesizedData: SynthesisData[] = [];
  private dataFetched = false;

  constructor(
    private citiesService: CitiesService,
    private alertsService: AlertsService
  ) {}

  getSynthesizedData(): Observable<SynthesisData[]> {
    if (this.dataFetched) {
      return of(this.synthesizedData);
    } else {
      return this.citiesService.getCities().pipe(
        map((data) => {
          this.synthesizedData = [];
          data.result.records.forEach((city: { [key: string]: string }) => {
            const en = city['שם_ישוב_לועזי'].trim();
            const heb = city['שם_ישוב'].trim();
            const alerts = this.alertsService.getAlerts(heb);

            this.synthesizedData.push({
              en,
              heb,
              alerts,
            });
          });
          this.dataFetched = true;
          return this.synthesizedData;
        })
      );
    }
  }
}
