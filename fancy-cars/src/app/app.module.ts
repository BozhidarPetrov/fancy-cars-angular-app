import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { CarsModule } from './cars/cars.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CarsModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
