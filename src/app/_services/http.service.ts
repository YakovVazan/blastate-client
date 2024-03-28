import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  appIsLoading: boolean = true;

  constructor() {}

  getAppIsLoading() {
    return this.appIsLoading;
  }
  
  setAppIsLoading(appIsLoading: boolean) {
    this.appIsLoading = appIsLoading;
  }
}
