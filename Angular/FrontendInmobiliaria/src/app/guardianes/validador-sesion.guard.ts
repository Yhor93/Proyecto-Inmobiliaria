import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../servicios/shared/local-storage.service';
import { SeguridadService } from '../servicios/shared/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorSesionGuard implements CanActivate {

  constructor(
    private servicoLocalStorage: LocalStorageService,
    private servicioSeguridad: SeguridadService,
    private router: Router
    ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let token = this.servicoLocalStorage.obtenerToken();
    if (token == "") {
      this.router.navigate(['/seguridad/login']);
      return false;
    } else {
      return true;
    }  
      
  }  
      // if (this.servicioSeguridad.obtenerInfoSesion()) {
      //   return true;
      // } else {
      //   this.router.navigate(['/inicio']);
      //   return false;
      // }
}
  

