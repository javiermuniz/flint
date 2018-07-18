import { TestBed, inject } from '@angular/core/testing';

import { PricingService } from './pricing.service';

describe('PricingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingService]
    });
  });

  it('should be created', inject([PricingService], (service: PricingService) => {
    expect(service).toBeTruthy();
  }));
});
