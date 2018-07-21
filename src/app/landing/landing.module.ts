import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [HomeComponent, PricingComponent]
})
export class LandingModule { }
