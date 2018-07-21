import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { PricingService } from '../../services/pricing.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'flint-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {

  
  @ViewChild('cardInfo') cardInfo: ElementRef;
  public form: FormGroup;
  public card: any;
  public cardHandler = this.onChange.bind(this);
  public cardError: string = null;
  public plan: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private stripe: StripeService,
              private auth: AuthService,
              public pricing: PricingService,
              private router: Router) {
      this.form = this.fb.group({
          email: [null, Validators.compose( [ Validators.required] )],
          password: [null, Validators.compose( [ Validators.required] )],
          firstName: [null, Validators.compose( [ Validators.required ])],
          lastName: [null, Validators.compose( [ Validators.required ])]
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.card = this.stripe.elements.create('card', { style:
      {
        base: {
        }
      }
    });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if(error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  async signUp() {
    const user = this.form.value;
    const { token, error } = await this.stripe.client.createToken(this.card);
    if(error) {
      // render validation error
    }
    try {
      const plan = this.plan;
      await this.auth.signUp({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        stripeToken: token,
        plan: plan
      });
    } catch(error) {
      console.log(error);
      // render creation error
    }
    this.router.navigate(['/']);
  }
}
