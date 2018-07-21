import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'flint-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

      this.form = this.fb.group({
          email:  [null , Validators.compose ( [ Validators.required ] )],
      });
  }

  public async resetPassword() {
    this.authService.resetPassword(this.form.value.email);
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {
      
  }

}
