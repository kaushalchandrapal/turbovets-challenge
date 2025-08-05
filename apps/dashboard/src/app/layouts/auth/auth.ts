// apps/dashboard/src/app/layouts/auth/auth.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  imports: [RouterOutlet],
})
export class AuthLayoutComponent {}
