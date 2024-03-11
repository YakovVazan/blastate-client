import { Component } from '@angular/core';
import { NavigationService } from './_services/navigation.service';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private navigationService: NavigationService,
    private tokenService: TokenService
  ) {}

  isHomePage(): boolean {
    return this.navigationService.isHomePage();
  }

  loggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }

  logout(): void {
    this.tokenService.removeToken();
    this.navigationService.redirectToLogin();
  }
}
