import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from '../car.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { UserData } from '../../types/UserData';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css',
})
export class AddNewComponent implements OnInit, OnDestroy {
  userIdtemp: string | undefined;
  userEmailTemp: string | undefined;
  owner: UserData = { _id: '' };
  private subscription: Subscription | undefined;

  constructor(
    private carService: CarService,
    private router: Router,
    private userService: UserService
  ) {}

  onAddNewCarSubmitHandler(form: NgForm): void {
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

    if (form.invalid || !this.carImageValidator(image)) {
      return;
    }

    this.carService
      .createCar(
        description,
        brand,
        model,
        engine,
        +horsepower,
        fuel,
        color,
        +year,
        image,
        this.owner
      )
      .subscribe(() => {
        this.router.navigate(['/user/my-cars']);
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
    this.subscription = this.userService.user$.subscribe((user) => {
      this.userEmailTemp = user?.email;
    });
    this.owner._id = this.userIdtemp;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
