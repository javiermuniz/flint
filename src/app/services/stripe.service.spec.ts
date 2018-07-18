import { TestBed, inject } from '@angular/core/testing';

import { StripeService } from './stripe.service';

describe('StripeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripeService]
    });
  });

  it('should be created', inject([StripeService], (service: StripeService) => {
    expect(service).toBeTruthy();
  }));
});
