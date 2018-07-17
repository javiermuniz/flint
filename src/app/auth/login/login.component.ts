import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireFunctions } from 'angularfire2/functions';


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
              private router: Router) {
      this.form = this.fb.group({
          email: [null, Validators.compose( [ Validators.required] )],
          password: [null, Validators.compose( [ Validators.required] )],
      });
  }

  ngOnInit() {
  }

  public async login() {
    this.aff.functions.httpsCallable('testBackup')().then((result) => {
      console.log(result);
      alert("Done!");
    });
  }

}
