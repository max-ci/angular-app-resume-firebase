import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  model = 'loggedIn';

  login(): void {
    localStorage.setItem(this.model, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.model);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.model);
  }
}
