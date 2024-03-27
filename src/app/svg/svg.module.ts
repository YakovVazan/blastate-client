import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusComponent } from './plus/plus.component';
import { MinusComponent } from './minus/minus.component';
import { CrossComponent } from './cross/cross.component';
import { CheckComponent } from './check/check.component';
import { WarnComponent } from './warn/warn.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { GraphComponent } from './graph/graph.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';

@NgModule({
  declarations: [
    PlusComponent,
    MinusComponent,
    CrossComponent,
    CheckComponent,
    WarnComponent,
    HamburgerComponent,
    GraphComponent,
    LeftComponent,
    RightComponent,
  ],
  imports: [CommonModule],
  exports: [
    PlusComponent,
    MinusComponent,
    CrossComponent,
    CheckComponent,
    WarnComponent,
    HamburgerComponent,
    GraphComponent,
    LeftComponent,
    RightComponent,
  ],
})
export class SvgModule {}
