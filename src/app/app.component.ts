import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { InputComponent } from './input/input.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  index: number = 0
  colors: string[] = ["red", "green", "blue"]
  textAtParent: string = ""

  appTestClick() {
    this.index = (this.index === (this.colors.length - 1)) ? 0 : this.index + 1
  }

  handleInputChange(value: string) {
    this.textAtParent = value
  }
}
