import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFromMongo } from '../../types/CarFromMongo';
import { CarService } from '../car.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { CookieManagerService } from '../../cookie-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  userId: string | undefined;
  carId: string | undefined;
  car: CarFromMongo | undefined;
  hasUser: boolean | undefined;
  isOwner: boolean | undefined;
  hasLiked: boolean | undefined;

  likesCounter: number | undefined;
  isLoading: boolean = true;

  hasError: boolean = false;

  private subscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private userService: UserService,
    private cookieManager: CookieManagerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cookieManager.isLoggedIn$.subscribe((boolean) => {
      this.hasUser = boolean;
      this.userService.user$.subscribe((user) => {
        this.userId = user?._id;
        this.carId = this.activatedRoute.snapshot.url[0].path;
        this.carService.getSingleCar(this.carId).subscribe({
          next: (car) => {
            this.car = car;
            this.isLoading = false;
            this.likesCounter = car.likes.length;
            if (this.userId) {
              if (this.car.likes.includes(this.userId)) {
                this.hasLiked = true;
                console.log(this.hasLiked);
              }
            }

            if (car.owner._id === this.userId) {
              this.isOwner = true;
            }
          },
          error: (err) => {
            console.error(`Error: ${err.message}`);
            // throw new Error(err.message);
            // this.router.navigate(['/404']);
            this.hasError = true;
          },
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteCar(): void {
    this.carId = this.activatedRoute.snapshot.url[0].path;
    this.carService.deleteCar(this.carId).subscribe(() => {
      this.router.navigate(['/user/my-cars']);
    });
  }

  likeCar() {
    this.carService.likeCar(this.carId, this.userId).subscribe(() => {
      this.carService.getSingleCar(this.carId).subscribe({
        next: (car) => {
          this.car = car;
          this.likesCounter = car.likes.length;
          this.hasLiked = true;
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });
    });
  }
}
