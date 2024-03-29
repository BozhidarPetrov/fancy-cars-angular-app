import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, MyCarsComponent],
  imports: [CommonModule, FormsModule, AppRoutingModule, TemplatesModule],
})
export class UserModule {}
