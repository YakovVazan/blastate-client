import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule, FormsModule, SvgModule],
})
export class AuthModule {}
