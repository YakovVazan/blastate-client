import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: 'auth/login', component: AuthComponent, pathMatch: 'full' },
  { path: 'auth/register', component: AuthComponent, pathMatch: 'full' },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
