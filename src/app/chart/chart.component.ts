import { Component } from '@angular/core';
import { ChartService } from '../_services/chart.service';
import { CitiesService } from '../_services/cities.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  constructor(
    private chartService: ChartService,
    private citiesService: CitiesService
  ) {}

  getCurrentCity() {
    return this.citiesService.currentCity;
  }

  getIsLoaded(): boolean {
    return this.chartService.isLoaded;
  }

  getLineChartData() {
    return this.chartService.lineChartData;
  }

  getLineChartLables() {
    return this.chartService.lineChartLabels;
  }

  getLineChartOptions() {
    return this.chartService.lineChartOptions;
  }

  getLineChartType() {
    return this.chartService.lineChartType;
  }

  prevArrowShouldBeDisabled() {
    return this.chartService.index <= 0;
  }

  nextArrowShouldBeDisabled() {
    return (
      this.chartService.index >= this.chartService.dividedChartsData.length - 1
    );
  }

  getCurrentIndex() {
    return this.chartService.index;
  }

  getDataLength() {
    return this.chartService.dividedChartsData.length;
  }

  getNextWeek() {
    if (
      this.chartService.index <
      this.chartService.dividedChartsData.length - 1
    )
      this.setIndex(this.chartService.index + 1);
  }

  getPreviousWeek() {
    if (this.chartService.index >= 0)
      this.setIndex(this.chartService.index - 1);
  }

  setIndex(index: number) {
    this.chartService.updateIndex(index);
  }
}
