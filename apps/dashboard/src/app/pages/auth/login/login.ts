import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginDto } from '@turbovets-challenge/data/dtos';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth/auth.actions';
import { Organization } from '@turbovets-challenge/data/entities';
import { selectAuthError } from '../../../store/auth/auth.selector';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  organizations: Organization[] = [];

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginDto = this.loginForm.value;
      this.store.dispatch(login({ credentials }));

      this.store.select(selectAuthError).subscribe((error) => {
        if (error?.statusCode === 401) {
          this.errorMessage = error.message.message || 'Invalid credentials';
        } else {
          this.errorMessage = null;
        }
      });
    }
  }
}
