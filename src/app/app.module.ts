import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { InputComponent } from './input/input.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent, TestComponent, InputComponent, MapComponent, SidebarComponent],
  imports: [
    CommonModule, RouterOutlet, BrowserModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
