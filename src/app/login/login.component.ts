import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  setUsername(e: Event): void {
    this.username = (e.target as HTMLInputElement).value;
  }

  setPassword(e: Event): void {
    this.password = (e.target as HTMLInputElement).value;
  }

  login() {
    console.log(this.username, this.password);
  }
}
