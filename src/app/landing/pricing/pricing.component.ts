import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';

@Component({
  selector: 'flint-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  constructor(public pricing: PricingService) { }

  ngOnInit() {
  }

}
