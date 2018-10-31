import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private sessionService: SessionService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.sessionService.isUserLogged()) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
