import { ChartType } from 'chart.js/auto';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import consts from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {};
  lineChartType: ChartType = 'bar';
  isLoaded: boolean = false;

  constructor(private alertsService: AlertsService) {
    this.createChart('');
  }

  createChart(cityName: string) {
    this.alertsService.getAllAlertsByCity(cityName).subscribe((data: any) => {
      this.assembleChart(data);
    });
  }

  assembleChart(data: any) {
    const chartData = [
      {
        data: data.map((event: any) => event.count),
        borderWidth: 1,
      },
    ];

    this.lineChartData = chartData;
    this.lineChartLabels = data.map((event: any) => event._id);
    this.lineChartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        subtitle: {
          display: false,
        },
      },
    };

    this.isLoaded = true;
  }
}
