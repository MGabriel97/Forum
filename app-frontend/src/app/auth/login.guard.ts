import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (sessionStorage.getItem("auth")=="false") {
          // logged in so return true
          return true;
      }
      
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/forums']);
      return false;
      }
  }

