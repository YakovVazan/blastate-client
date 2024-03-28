import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  constructor(private httpService: HttpService) {}

  spinnerShouldBeShown() {
    return this.httpService.getAppIsLoading();
  }
}
