import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFromMongo } from '../../types/CarFromMongo';
import { CarService } from '../car.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  userId: string | undefined;
  carId: string | undefined;
  car: CarFromMongo | undefined;

  likesCounter: number | undefined;

  private subscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.subscription = this.userService.user$.subscribe(user=> {this.userId = user?._id})

    this.carId = this.activatedRoute.snapshot.url[0].path;

    this.carService.getSingleCar(this.carId).subscribe({
      next: (car) => {
        this.car = car;
        this.likesCounter = car.likes.length;
      },
      error: (err) => {
        console.error(`Error: ${err.message}`);
      },
    });
  }

  deleteCar(): void{

    this.carId = this.activatedRoute.snapshot.url[0].path;
   this.carService.deleteCar(this.carId).subscribe(()=>{
    this.router.navigate(['/user/my-cars'])
   });
   
    
  }

  likeCar(){
    this.carService.likeCar(this.carId, this.userId).subscribe(()=>{
      this.carService.getSingleCar(this.carId).subscribe({
        next: (car) => {
          this.car = car;
          this.likesCounter = car.likes.length;
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });


     });



    
     

    
    
  }


}
