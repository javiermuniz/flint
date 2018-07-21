import { Injectable } from '@angular/core';


export interface Plan {
  id: string;
  name: string;
  price: number;
  features: Array<string>;
}

@Injectable({
  providedIn: 'root'
})

export class PricingService {

  public plans: Plan[] = [
    {
      id: 'free',
      name: "Free",
      price: 0,
      features: [
        'feature1',
        'feature2',
        'feature3',
      ]
    },
    {
      id: 'basic',
      name: "Basic",
      price: 5,
      features: [
        'feature4',
        'feature5',
        'feature6',
      ]
    },
    {
      id: 'pro',
      name: "Professional",
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
