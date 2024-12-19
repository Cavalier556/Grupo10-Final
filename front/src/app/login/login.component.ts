import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const body = JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post<LoginResponse>('http://localhost:3000/api/login', body, {
          headers,
        })
        .subscribe(
          (response) => {
            if (response && response.auth) {
              this.router.navigate(['dashboard']);
            } else {
              console.error('Error al identificarse');
            }
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
}
