// Guard für den Admin Bereich
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {$localize} from '@angular/localize/init';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  constructor(@Inject(PLATFORM_ID) private pid: object) {}




  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (isPlatformServer(this.pid)) {
      return true;
    }

    if (isPlatformBrowser(this.pid)) {
      if (!this.accessGranted) {
        const question = $localize`:@@CanNavigateToAdminGuard\:question: Mit großer Macht kommt große Verantwortung. Möchten Sie den Admin-Bereich betreten?`;
        this.accessGranted = window.confirm(question);
      }
      return this.accessGranted;
    }
  }
}
