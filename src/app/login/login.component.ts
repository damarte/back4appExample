import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoginObject } from '../models/login-object.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const context = this;
      this.authenticationService.login(new LoginObject(this.loginForm.value)).then(
        user => {
          console.log(user);
          context.router.navigate(['/test']);
        }
      ).catch(
        error => console.error(error)
      );
    }
  }
}
