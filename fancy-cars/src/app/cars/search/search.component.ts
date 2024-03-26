import { Component, OnInit } from '@angular/core';
import { CarFromMongo } from '../../types/CarFromMongo';
import { CarService } from '../car.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  allCars: CarFromMongo[] = [];
  filteredCars: CarFromMongo[] = [];
  hasResult: boolean = true;

  isLoading: boolean = true;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (allCars) => {
        this.allCars = allCars;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Error: ${err.message}`);
      },
    });
  }

  searchBrand(form: NgForm): void {
    const searchBrand = form.value.brand;

    this.filteredCars = this.allCars.filter((car) =>
      car.brand.toLocaleLowerCase().includes(searchBrand.toLocaleLowerCase())
    );

    if (this.filteredCars.length === 0) {
      this.hasResult = false;
    } else {
      this.hasResult = true;
    }
    form.reset();
  }

  searchModel(form: NgForm): void {
    const searchModel = form.value.model;

    this.filteredCars = this.allCars.filter((car) =>
      car.model.toLocaleLowerCase().includes(searchModel.toLocaleLowerCase())
    );

    if (this.filteredCars.length === 0) {
      this.hasResult = false;
    } else {
      this.hasResult = true;
    }
    form.reset();
  }
}
