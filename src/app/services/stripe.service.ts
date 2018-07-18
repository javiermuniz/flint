import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})

export class StripeService {
  public client: any;
  public elements: any;

  constructor() { 
    this.client = Stripe(environment.stripe.publicKey); 
    this.elements = this.client.elements();
  }
}
