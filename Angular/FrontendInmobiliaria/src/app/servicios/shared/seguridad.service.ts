import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { credencialesUsuarioModel } from 'src/app/modelos/credencialesUsuario.modelo';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url= 'http://localhost:3000';
  infoSesion: BehaviorSubject<DatosSesionModel> = new BehaviorSubject<DatosSesionModel>(new DatosSesionModel())

  constructor(
    private Http: HttpClient,
    private servicioLocalStorage: LocalStorageService
    ){ 
  }

  Logueo(credenciales:credencialesUsuarioModel):Observable<any>{
    return this.Http.post(`${this.url}/Login`,{
      usuario: credenciales.usuario,
      clave: credenciales.clave
    },{
      headers: new HttpHeaders({})
    });
      
  }

  verificarSesionActiva(){
    let info = this.servicioLocalStorage.obtenerSesionInfo();
    if (info) {
      info.Logueado=true;
      this.actualizarDatosSesion(info);
      return true;
    } else {
      return false;
    }
  }

  actualizarDatosSesion(datos:DatosSesionModel){
    this.infoSesion.next(datos);
  }

  obtenerInfoSesion(){
    return this.infoSesion.asObservable()
  }
}
