import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from '../../shared/auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public dialog: MatDialog) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('userToken');
    if (!token) {
      this.dialog.open(AuthComponent, {disableClose: true});
    }
    return !!token;
  }

}
