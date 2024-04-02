import { Injectable } from '@angular/core';
import { Car } from '../types/Car';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../types/UserData';
import { CarFromMongo } from '../types/CarFromMongo';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  createCar(
    description: string,
    brand: string,
    model: string,
    engine: string,
    horsepower: number,
    fuel: string,
    color: string,
    year: number,
    image: string,
    owner: UserData
  ) {
    return this.http.post<Car>('http://localhost:3030/cars/create', {
      description,
      brand,
      model,
      engine,
      horsepower,
      fuel,
      color,
      year,
      image,
      owner,
    });
  }

  updateCar(
    carId: string,
    description: string,
    brand: string,
    model: string,
    engine: string,
    horsepower: number,
    fuel: string,
    color: string,
    year: number,
    image: string
  ) {
    return this.http.post<Car>(`http://localhost:3030/cars/${carId}/edit`, {
      description,
      brand,
      model,
      engine,
      horsepower,
      fuel,
      color,
      year,
      image,
    });
  }

  getAllCars() {
    return this.http.get<[]>('http://localhost:3030/cars/all');
  }

  getSingleCar(id: string | undefined) {
    return this.http.get<CarFromMongo>(
      `http://localhost:3030/cars/${id}/details`
    );
  }

  deleteCar(id: string) {
    return this.http.get(`http://localhost:3030/cars/${id}/delete`);
  }

  likeCar(carId: string | undefined, userId: string | undefined) {
    return this.http.post(`http://localhost:3030/cars/${carId}/like`, {
      carId,
      userId,
    });
  }
}
