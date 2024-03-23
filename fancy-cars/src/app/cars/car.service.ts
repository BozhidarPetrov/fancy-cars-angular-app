import { Injectable } from '@angular/core';
import { Car } from '../types/Car';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserData } from '../types/UserData';
import { CarFromMongo } from '../types/CarFromMongo';

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

  createCar(description: string, brand: string, model: string, engine: string, horsepower: number, fuel:string, color:string, year:number, image:string, owner: UserData) {
    return this.http
      .post<Car>('http://localhost:3030/cars/create', {
        description,
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
    }

      updateCar(carId: string, description: string, brand: string, model: string, engine: string, horsepower: number, fuel:string, color:string, year:number, image:string, owner: UserData) {
        return this.http
          .post<Car>(`http://localhost:3030/cars/${carId}/edit`, {
            description,
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
        }

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
  

  getAllCars(){
    return this.http
    .get<[]>('http://localhost:3030/cars/all');
  }

  getSingleCar(id: string | undefined){
    return this.http.get<CarFromMongo>(`http://localhost:3030/cars/${id}/details`)
  }

  deleteCar(id: string){
     return this.http.get(`http://localhost:3030/cars/${id}/delete`);
  }
  
  likeCar(carId: string | undefined, userId: string | undefined){
    return this.http.post(`http://localhost:3030/cars/${carId}/like`, {
      carId, userId
    })
  }
}

