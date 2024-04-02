import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car = {
    _id: '',
    description: '',
    brand: '',
    model: '',
    engine: '',
    horsepower: 0,
    fuel: '',
    color: '',
    year: 0,
    image: '',
    owner: {
      _id: '',
      username: '',
    },
  };
  @Input() onMyCars = false;
}
