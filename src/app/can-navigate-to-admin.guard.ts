// Guard für den Admin Bereich
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import { $localize } from '@angular/localize/init';
import {isPlatformServer} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  constructor(@Inject(PLATFORM_ID) private pid: object) {} // Injizieren von Informationen über die Laufzeitumgebung: Anwendung läuft im ServerSide-Rendering oder im Browser

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (isPlatformServer(this.pid)) {
      return of(true); // Erzeugt ein Observable<true>
    }

    if (!this.accessGranted) {
      const question = $localize`:@@CanNavigateToAdminGuard\:question: Mit großer Macht kommt große Verantwortung. Möchten Sie den Admin-Bereich betreten?`;
      this.accessGranted = window.confirm(question);
    }
    return this.accessGranted;
  }

}
