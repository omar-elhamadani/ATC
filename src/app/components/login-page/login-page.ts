import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  type: string = 'password';
  data: object = {};
  myLogForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get emailValid() {
    return this.myLogForm.controls.email;
  }
  get passwordValid() {
    return this.myLogForm.controls.password;
  }

  showHidePassword() {
    if (this.type == 'password') this.type = 'text';
    else this.type = 'password';
  }
  loginUser(password: HTMLInputElement, email: HTMLInputElement) {
    this.auth.login(email.value, password.value).subscribe({
      next: (res) => {
        const token = res?.token;

        if (!token) {
          this.error = 'No token returned by API. Check response structure.';
          return;
        }
        this.auth.setToken(token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Login failed';
      },
    });
  }
}
