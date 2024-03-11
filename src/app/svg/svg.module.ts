import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusComponent } from './plus/plus.component';
import { MinusComponent } from './minus/minus.component';
import { CrossComponent } from './cross/cross.component';
import { CheckComponent } from './check/check.component';

@NgModule({
  declarations: [PlusComponent, MinusComponent, CrossComponent, CheckComponent],
  imports: [CommonModule],
  exports: [PlusComponent, MinusComponent, CrossComponent, CheckComponent],
})
export class SvgModule {}
