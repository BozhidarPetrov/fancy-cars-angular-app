import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import {CarFromMongo} from '../../types/CarFromMongo'

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.css'
})
export class AllCarsComponent implements OnInit{
allCars: CarFromMongo[] = [];
  constructor(private carService: CarService){}

ngOnInit(): void {

  this.carService.getAllCars().subscribe({
    next: (allCars) => {
      this.allCars = allCars;
    },
    error: (err) => {
      console.error(`Error: ${err.message}`);
    },
  });


}

}
