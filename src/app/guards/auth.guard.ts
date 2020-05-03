import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.loggedIn()) {
      // check if user is logged in and if his role has access to route
      // if your app doesn't have roles you can delete this block of code
      if (
        route.data.roles &&
        route.data.roles.indexOf(this.authService.getRole) === -1
      ) {
        return false;
      }
      return true;
    }
    this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
