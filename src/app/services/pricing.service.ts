import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export interface Plan {
  name: string;
  price: number;
  features: Array<string>;
}

export class PricingService {

  public plans: Plan[] = [
    {
      name: "Free",
      price: 0,
      features: [
        'feature1',
        'feature2',
        'feature3',
      ]
    },
    {
      name: "Indie",
      price: 5,
      features: [
        'feature4',
        'feature5',
        'feature6',
      ]
    },
    {
      name: "Hacker",
      price: 10,
      features: [
        'feature7',
        'feature8',
        'feature9',
      ]
    }
  ];
  
  constructor() { }
}
