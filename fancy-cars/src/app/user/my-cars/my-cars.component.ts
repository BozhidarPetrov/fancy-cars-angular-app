import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CarFromMongo } from '../../types/CarFromMongo';
import { CarService } from '../../cars/car.service';
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

  isLoading: boolean = true;
  onMyCars: boolean = true;

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
          this.isLoading = false;
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });
    });

    this.subscription = this.userService.user$.subscribe((user) => {
      this.username = user?.username;
    });
  }
}
