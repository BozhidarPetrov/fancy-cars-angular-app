import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
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
  form = this.formBuilder.group({
    description: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(20)],
    ],
    brand: ['', [Validators.required, Validators.minLength(3)]],
    model: ['', [Validators.required, Validators.minLength(2)]],
    engine: ['', [Validators.required, Validators.minLength(2)]],
    horsepower: [0, [Validators.required, Validators.min(1)]],
    fuel: ['', [Validators.required, Validators.minLength(3)]],
    color: ['', [Validators.required, Validators.minLength(3)]],
    year: [0, [Validators.required, Validators.min(1900)]],
    image: ['', [Validators.required, this.carImageValidator('image')]],
  });

  userIdtemp: string | undefined;
  owner: UserData = { _id: '' };
  isOwner: boolean | undefined;
  isLoading = true;
  private subscription: Subscription | undefined;

  carId: string = '';

  hasError: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  onEditSubmitHandler() {
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
    } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    if (
      description &&
      brand &&
      model &&
      engine &&
      horsepower &&
      fuel &&
      color &&
      year &&
      image
    ) {
      this.carService
        .updateCar(
          this.carId,
          description,
          brand,
          model,
          engine,
          horsepower,
          fuel,
          color,
          year,
          image
        )
        .subscribe(() => {
          this.router.navigate([`/cars/${this.carId}/details`]);
        });
    }
  }

  carImageValidator(imageUrl: string): ValidatorFn {
    const pattern = /^https?:\/\/(.+)$/;

    return (control) => {
      return control.value === '' || pattern.test(control.value)
        ? null
        : { carImageValidator: true };
    };
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.userIdtemp = user?._id;

      this.owner._id = this.userIdtemp;

      this.carId = this.activatedRoute.snapshot.url[0].path;

      this.carService.getSingleCar(this.carId).subscribe({
        next: (car) => {
          this.form.get('description')?.setValue(car.description);
          this.form.get('brand')?.setValue(car.brand);
          this.form.get('model')?.setValue(car.model);
          this.form.get('engine')?.setValue(car.engine);
          this.form.get('horsepower')?.setValue(car.horsepower);
          this.form.get('fuel')?.setValue(car.fuel);
          this.form.get('color')?.setValue(car.color);
          this.form.get('year')?.setValue(car.year);
          this.form.get('image')?.setValue(car.image);

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
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
