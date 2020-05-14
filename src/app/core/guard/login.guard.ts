import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.loggedIn) {
      return true;
    }
    // if user is already logged in redirect him to dashboard
    // you can change this to fit your end result based on roles or flow
    this.router.navigate(['/dashboard']);
    return false;
  }
}
