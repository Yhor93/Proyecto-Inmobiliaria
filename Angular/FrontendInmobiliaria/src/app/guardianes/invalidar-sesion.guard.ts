import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../servicios/shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvalidarSesionGuard implements CanActivate {
  constructor(
    private servicioLocalStorage: LocalStorageService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.servicioLocalStorage.obtenerToken();
    if (token) {
      this.router.navigate(['/inicio']);
      return false;
    } else {
      return true;
    }
  }
  
}
