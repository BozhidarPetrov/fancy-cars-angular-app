import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarFromMongo } from '../../types/CarFromMongo';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Subscription } from 'rxjs';
import { UserData } from '../../types/UserData';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit, OnDestroy {
  userIdtemp: string | undefined;
  owner: UserData = { _id: '' };
  isOwner: boolean | undefined;
  isLoading = true;
  private subscription: Subscription | undefined;

  carId: string = '';

  car = {
    description: '',
    brand: '',
    model: '',
    engine: '',
    horsepower: 0,
    fuel: '',
    color: '',
    year: 0,
    image: '', 
  };

  hasError: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private userService: UserService
  ) {}

  onEditSubmitHandler(form: NgForm) {
    const {
      description,
      brand,
      model,
      engine,
      horsepower,
      fuel,
      color,
      year,
      image,
    } = form.value;

    if (form.invalid) {
      return;
    }

    this.carService
      .updateCar(
        this.carId,
        description,
        brand,
        model,
        engine,
        +horsepower,
        fuel,
        color,
        +year,
        image
      )
      .subscribe(() => {
        this.router.navigate([`/cars/${this.carId}/details`]);
      });
  }

  carImageValidator(imageUrl: string): boolean {
    const pattern = /^https?:\/\/(.+)$/;

    return pattern.test(imageUrl);
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.userIdtemp = user?._id;
    });
    this.owner._id = this.userIdtemp;

    this.carId = this.activatedRoute.snapshot.url[0].path;

    this.carService.getSingleCar(this.carId).subscribe({
      next: (car) => {
        this.car = {
          description: car.description,
          brand: car.brand,
          model: car.model,
          engine: car.engine,
          horsepower: car.horsepower,
          fuel: car.fuel,
          color: car.color,
          year: car.year,
          image: car.image,
        };
       
        this.isLoading = false;

        if (car.owner._id === this.userIdtemp) {
          this.isOwner = true;
        }
      },
      error: (err) => {
        console.error(`Error: ${err.message}`);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
