import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CambioClaveModel } from 'src/app/modelos/cambio-clave.modelo';
import { credencialesUsuarioModel } from 'src/app/modelos/credencialesUsuario.modelo';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { RolesModel } from 'src/app/modelos/roles.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  url = 'http://localhost:3000';
  infoSesion: BehaviorSubject<DatosSesionModel> =
    new BehaviorSubject<DatosSesionModel>(new DatosSesionModel());

  constructor(
    private Http: HttpClient,
    private servicioLocalStorage: LocalStorageService
  ) {
    this.verificarSesionActiva();
  }

  Logueo(credenciales: credencialesUsuarioModel): Observable<any> {
    return this.Http.post(
      `${this.url}/Login`,
      {
        usuario: credenciales.usuario,
        clave: credenciales.clave,
      },
      {
        headers: new HttpHeaders({}),
      }
    );
  }

  verificarSesionActiva() {
    let info = this.servicioLocalStorage.obtenerSesionInfo();
    if (info) {
      info.Logueado = true;
      this.actualizarDatosSesion(info);
      return true;
    } else {
      return false;
    }
  }

  actualizarDatosSesion(datos: DatosSesionModel) {
    this.infoSesion.next(datos);
  }

  obtenerInfoSesion() {
    return this.infoSesion.asObservable();
  }

  obtenerRoles(): Observable<RolesModel[]> {
    return this.Http.get<RolesModel[]>(`${this.url}/roles`);
  }

  recuperarClave(email: string): Observable<boolean> {
    console.log(`${this.url}/RecuperarPass`);
    console.log(email);
    return this.Http.post<boolean>(`${this.url}/RecuperarPass`,
      {
        email: email
      },
      {
        headers: new HttpHeaders({}),
      }

    );
  }

   cambioClave(data: CambioClaveModel):Observable<boolean>{{
    return this.Http.post<boolean>(`${this.url}/ModificarPass`,
    {
      cActual: data.claveActual,
      cNueva: data.nuevaClave,
      cValidada: data.cValidada,
      email: data.email
    },
    {
      headers: new HttpHeaders({}),
    });    
  }
  } 
}
