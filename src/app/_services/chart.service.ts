import { ChartType } from 'chart.js/auto';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import consts from '../utils/constant';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {};
  lineChartType: ChartType = 'bar';
  isLoaded: boolean = false;
  dividedChartsData: any = [];
  index: number = 0;

  constructor(
    private alertsService: AlertsService,
    private tokenService: TokenService
  ) {
    !this.disableMetricsButton() && this.createChart('');
  }

  createChart(cityName: string) {
    this.alertsService.getAllAlertsByCity(cityName).subscribe((data: any) => {
      this.dividedChartsData = this.groupData(data);
      this.assembleChart(this.dividedChartsData[this.index]);
    });
  }

  groupData(data: any[]): any[] {
    const groupedData: any[] = [];
    for (let i = 0; i < data.length; i += consts.MAX_CHART) {
      groupedData.push(data.slice(i, i + consts.MAX_CHART));
    }
    return groupedData;
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

  updateIndex(index: number) {
    this.index = index;
    this.assembleChart(this.dividedChartsData[this.index]);
  }

  disableMetricsButton() {
    return this.tokenService.getToken() === null;
  }
}
