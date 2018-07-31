import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  canActivate() {
    if (this.authenticationService.isAuthenticated) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);

    return false;
  }
}
