import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SvgModule } from '../svg/svg.module';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule, FormsModule, SvgModule, SpinnerModule],
})
export class AuthModule {}
