import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    HeroComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeroComponent, LoaderComponent]
})
export class TemplatesModule { }
