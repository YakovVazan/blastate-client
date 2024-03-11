import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isLoginPage(): boolean {
    return this.router.url === '/auth/login';
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
