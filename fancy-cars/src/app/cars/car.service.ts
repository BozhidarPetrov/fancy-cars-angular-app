import { Injectable } from '@angular/core';
import { Car } from '../types/Car';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserData } from '../types/UserData';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  // private car$$ = new BehaviorSubject<Car | undefined>(undefined);

  // car$ = this.car$$.asObservable();

  // car: Car | undefined;

 

  // subscription: Subscription;

  constructor(private http: HttpClient) {
    // this.subscription = this.car$.subscribe((car) => {
    //   this.car = car});
 
  }

  createCar(brand: string, model: string, engine: string, horsepower: number, fuel:string, color:string, year:number, image:string, owner: UserData) {
    return this.http
      .post<Car>('http://localhost:3030/cars/create', {
        brand,
        model,
        engine,
        horsepower,
        fuel,
        color,
        year,
        image,
        owner
      });
     

  // createCar(brand: string, model: string, engine: string, horsepower: number, fuel:string, color:string, year:number, image:string, owner: UserData) {
  //   return this.http
  //     .post<Car>('http://localhost:3030/cars/create', {
  //       brand,
  //       model,
  //       engine,
  //       horsepower,
  //       fuel,
  //       color,
  //       year,
  //       image,
  //       owner
  //     })
  //     .pipe(tap((car) => this.car$$.next(car)));
  }

  getAllCars(){
    return this.http
    .get<[{}]>('http://localhost:3030/cars/all');
  }
  
}

