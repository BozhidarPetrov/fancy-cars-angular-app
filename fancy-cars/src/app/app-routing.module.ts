import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MyCarsComponent } from './user/my-cars/my-cars.component';
import { AllCarsComponent } from './cars/all-cars/all-cars.component';
import { AddNewComponent } from './cars/add-new/add-new.component';
import { SearchComponent } from './cars/search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './cars/details/details.component';
import { EditComponent } from './cars/edit/edit.component';
import { GuestGuard } from './guards/guestsGuard';
import { UserGuard } from './guards/userGuard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [UserGuard] },
      { path: 'my-cars', component: MyCarsComponent, canActivate: [GuestGuard] },
    ],
  },
  {
    path: 'cars',
    children: [
      { path: 'all', component: AllCarsComponent },
      { path: 'add', component: AddNewComponent , canActivate: [GuestGuard]},
      { path: 'search', component: SearchComponent },
      { path: ':carId/details', component: DetailsComponent },
      { path: ':carId/edit', component: EditComponent, canActivate: [GuestGuard] },
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
