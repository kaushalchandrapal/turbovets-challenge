import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss'],
  imports: [RouterOutlet, RouterModule],
})
export class DashboardLayoutComponent {
  router = inject(Router);
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
