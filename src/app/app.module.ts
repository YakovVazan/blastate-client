import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { SvgModule } from './svg/svg.module';
import { NavigationService } from './_services/navigation.service';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MapComponent,
    SidebarComponent,
    OffcanvasComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    LeafletModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuthModule,
    SvgModule,
  ],
  providers: [
    NavigationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
