import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from './common/interfaces/link';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links: Link[] = [
    {
      path: 'home',
      title: 'Home',
    },
    {
      path: 'budgets',
      title: 'Budgets',
    },
    {
      path: 'expenses',
      title: 'Expenses',
    },
    {
      path: 'stats',
      title: 'Stats',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
