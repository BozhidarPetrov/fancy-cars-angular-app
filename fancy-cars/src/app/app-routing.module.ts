import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MyCarsComponent } from './user/my-cars/my-cars.component';
import { AllCarsComponent } from './cars/all-cars/all-cars.component';
import { AddNewComponent } from './cars/add-new/add-new.component';
import { SearchComponent } from './cars/search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './cars/details/details.component';
import { EditComponent } from './cars/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'my-cars', component: MyCarsComponent },
    ],
  },
  {
    path: 'cars',
    children: [
      { path: 'all', component: AllCarsComponent },
      { path: 'add', component: AddNewComponent },
      { path: 'search', component: SearchComponent },
      { path: 'details', component: DetailsComponent },
      { path: ':carId/details', component: DetailsComponent },
      { path: ':carId/edit', component: EditComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
