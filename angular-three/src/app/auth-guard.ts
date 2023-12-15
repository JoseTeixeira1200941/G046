import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/User/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRoles'];

    
  
    if (expectedRoles.some((role: string) => this.authService.hasRole(role))) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}