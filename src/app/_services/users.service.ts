import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  username: string = '';

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return localStorage.getItem('username') || this.username;
  }

  removeUsername(): void {
    localStorage.removeItem('username');
  }
}
