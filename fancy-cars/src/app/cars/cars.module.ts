import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { AddNewComponent } from './add-new/add-new.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { ShortenTextPipe } from '../pipes/shortenText.pipe';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  declarations: [
    AllCarsComponent,
    AddNewComponent,
    DetailsComponent,
    SearchComponent,
    EditComponent,
    ShortenTextPipe,
  ],
  imports: [CommonModule, FormsModule, AppRoutingModule, TemplatesModule],
})
export class CarsModule {}
