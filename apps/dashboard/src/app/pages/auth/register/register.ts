import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleEnum } from '@turbovets-challenge/data/enums';
import { Organization } from '@turbovets-challenge/data/entities';
import { loadOrganizations } from '../../../store/organization/organization.actions';
import { selectOrganizations } from '../../../store/organization/organization.selectors';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { register } from '../../../store/auth/auth.actions';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ToastrModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = Object.values(RoleEnum);
  organizations: any[] = [];
  toastr = inject(ToastrService);
  private snackBar = inject(MatSnackBar);
  

  constructor(private fb: FormBuilder, private http: HttpClient, private store: Store) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['' , [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      organizationId: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.store.dispatch(loadOrganizations());

    this.store.select(selectOrganizations).subscribe(data => {
      this.organizations = data as Organization[];
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(register({ credentials: this.registerForm.value }));
    }
  }
}
