import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { UsersService } from '../_services/users.service';
import { NavigationService } from '../_services/navigation.service';
import consts from '../utils/constant';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  userDetails: { [key: string]: string } = {
    username: '',
    password: '',
  };
  errorDetails: string = '';

  constructor(
    private navigationService: NavigationService,
    private tokenService: TokenService,
    private usersService: UsersService,
    private httpService: HttpService
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
    this.httpService.setAppIsLoading(true);
    if (this.isLoginPage()) {
      this.login();
    } else {
      this.register();
    }
  }

  async login() {
    try {
      const response = await fetch(`${consts.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userDetails),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      this.tokenService.setToken(data.access_token);
      this.usersService.setUsername(this.userDetails['username']);
      this.navigationService.redirectToHome();
    } catch (error: any) {
      this.errorDetails = error['message'];
      console.error(error);
    } finally {
      this.httpService.setAppIsLoading(false);
    }
  }

  async register() {
    try {
      if (!this.userDetails['username'] || !this.userDetails['password']) {
        throw new Error('Username and password are required');
      }

      const response = await fetch(`${consts.API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userDetails),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      this.navigationService.redirectToLogin();
    } catch (error: any) {
      this.errorDetails = error['message'];
      console.error(error);
    } finally {
      this.httpService.setAppIsLoading(false);
    }
  }
}
