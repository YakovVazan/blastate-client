import { Component } from '@angular/core';
import { NavigationService } from '../_services/navigation.service';
import API_BASE_URL from '../utils/constant';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  userDetails: { [key: string]: any } = {};

  constructor(
    private navigationService: NavigationService,
    private tokenService: TokenService
  ) {}

  isLoginPage(): boolean {
    return this.navigationService.isLoginPage();
  }

  setUsername(e: Event): void {
    this.userDetails['username'] = (e.target as HTMLInputElement).value;
  }

  setPassword(e: Event): void {
    this.userDetails['password'] = (e.target as HTMLInputElement).value;
  }

  handleAuthAction() {
    if (this.isLoginPage()) {
      this.login();
    } else {
      this.register();
    }
  }

  async login() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userDetails),
      });

      if (!response.ok) {
        console.log(await response.text());
      }

      const data = await response.json();

      this.tokenService.setToken(data.access_token);
      this.navigationService.redirectToHome();
    } catch (error) {
      console.error(error);
    }
  }

  async register() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userDetails),
      });

      if (!response.ok) {
        console.log(await response.text());
      }

      const data = await response.json();
      console.log(data);

      this.navigationService.redirectToLogin();
    } catch (error) {
      console.error(error);
    }
  }
}
