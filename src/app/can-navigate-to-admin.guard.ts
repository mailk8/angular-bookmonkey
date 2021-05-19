// Guard für den Admin Bereich
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.accessGranted) {
      const question = $localize`:@@CanNavigateToAdminGuard\:question: Mit großer Macht kommt große Verantwortung. Möchten Sie den Admin-Bereich betreten?`;
      this.accessGranted = window.confirm(question);
    }
    return this.accessGranted;
  }

}
