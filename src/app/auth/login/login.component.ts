import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireFunctions } from 'angularfire2/functions';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'flint-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private aff: AngularFireFunctions,
              private auth: AuthService,
              private router: Router) {
      this.form = this.fb.group({
          email: [null, Validators.compose( [ Validators.required] )],
          password: [null, Validators.compose( [ Validators.required] )],
      });
  }

  ngOnInit() {
  }

  public async login() {
    await this.auth.login(this.form.value.email, this.form.value.password);
    this.router.navigate(['/']);
  }

}
