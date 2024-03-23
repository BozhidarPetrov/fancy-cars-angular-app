import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { AddNewComponent } from './add-new/add-new.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AllCarsComponent,
    AddNewComponent,
    DetailsComponent,
    SearchComponent,
    EditComponent,
  ],
  imports: [
    CommonModule, FormsModule, AppRoutingModule
  ]
})
export class CarsModule { }
