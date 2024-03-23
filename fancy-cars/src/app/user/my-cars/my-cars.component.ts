import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CarFromMongo } from '../../types/CarFromMongo';
import { CarService } from '../../cars/car.service';
import { Car } from '../../types/Car';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.css',
})
export class MyCarsComponent implements OnInit {
  allCars: CarFromMongo[] = [];
  myCars: CarFromMongo[] = [];

  id: String | undefined;
  username: String | undefined;

  private subscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.id = user?._id;
      this.carService.getAllCars().subscribe({
        next: (allCars) => {
          this.allCars = allCars;

          this.myCars = this.allCars.filter((car) => car.owner._id === this.id);
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });
    });

    this.subscription = this.userService.user$.subscribe((user) => {
      this.username = user?.username;
    });

    // this.myCars = this.allCars.filter((car) => car.owner._id === this.id)

    // console.log(this.allCars);
    // console.log(this.myCars);
  }
}
