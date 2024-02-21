import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [AppComponent, MapComponent, SidebarComponent],
  imports: [
    CommonModule, RouterOutlet, BrowserModule, LeafletModule, FormsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
