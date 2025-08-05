import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth/auth';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { Task } from './pages/dashboard/task/task';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
import { CreateTaskComponent } from './pages/dashboard/create-task/create-task';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate:[GuestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'task', component: Task },
      { path: 'create-task', component: CreateTaskComponent },
      { path: '', redirectTo: 'task', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
