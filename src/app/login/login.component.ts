import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userDetails: { [key: string]: any } = {};

  setUsername(e: Event): void {
    this.userDetails['username'] = (e.target as HTMLInputElement).value;
  }

  setPassword(e: Event): void {
    this.userDetails['password'] = (e.target as HTMLInputElement).value;
  }

  login() {
    console.log(this.userDetails);
  }
}
