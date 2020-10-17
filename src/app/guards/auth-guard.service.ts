import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const operation: OperatorFunction<boolean, boolean> = map(isAuthenticated => {
      if (isAuthenticated) {
        return isAuthenticated;
      }

      this.router.navigate(['login']);
    });

    return this.authService.auth().pipe(operation);
  }
}
