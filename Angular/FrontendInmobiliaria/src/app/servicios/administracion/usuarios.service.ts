import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { LocalStorageService } from '../shared/local-storage.service';
import { DatosUserModel } from 'src/app/modelos/datos-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url= 'http://localhost:3000';
  infoSesion: BehaviorSubject<DatosSesionModel> = new BehaviorSubject<DatosSesionModel>(new DatosSesionModel())
  
  

  constructor(
    private Http: HttpClient,
    private servicioLocalStorage: LocalStorageService
    ){ 
  }

  Registro(datos:DatosUserModel):Observable<any>{  
  return this.Http.post(`${this.url}/RegistroUsuarios`,{
    nombre: datos.nombre,
    cedula: datos.cedula,
    celular: datos.celular,
    email: datos.email,
    ciudad: datos.ciudad
  },{
    headers: new HttpHeaders({})
  });
    
}


}
