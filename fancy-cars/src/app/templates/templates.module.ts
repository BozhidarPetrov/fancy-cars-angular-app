import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { LoaderComponent } from './loader/loader.component';
import { CarCardComponent } from './car-card/car-card.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HeroComponent,
    LoaderComponent,
    CarCardComponent

  ],
  imports: [
    CommonModule, AppRoutingModule
  ],
  exports: [HeroComponent, LoaderComponent, CarCardComponent]
})
export class TemplatesModule { }
