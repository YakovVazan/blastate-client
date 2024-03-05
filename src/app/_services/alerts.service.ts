import { Injectable } from '@angular/core';
import rawData from './rawData';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  getAlerts(heb: string): number {
    let alertsNumber = 0;

    for (let i = 0; i < rawData.messages.length; i++) {
      let textEntities = rawData.messages[i].text_entities;
      for (let j = 0; j < textEntities.length; j++) {
        if (textEntities[j].text.includes('•')) {
          let cityNameWithoutParentheses = textEntities[j + 1].text
            .trim()
            .replace(/\([^()]*\)/g, '');

          let cities = cityNameWithoutParentheses.split(',');

          cities.forEach((city) => {
            if (city === heb) alertsNumber += 1;
          });
        }
      }
    }

    return alertsNumber;
  }
}
