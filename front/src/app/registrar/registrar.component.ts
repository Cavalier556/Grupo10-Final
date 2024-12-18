import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../login/login.interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registrar() {
    console.log('boton');
    if (this.loginForm.valid) {
      const body = JSON.stringify({
        username: this.loginForm.value.username,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post<LoginResponse>('http://localhost:3000/api/create-user', body, {
          headers,
        })
        .subscribe(
          (response) => {
            if (response && response.auth) {
              this.router.navigate(['']);
            } else {
              console.error('Error al registrarse');
            }
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      console.log('no es valido');
    }
  }
}
