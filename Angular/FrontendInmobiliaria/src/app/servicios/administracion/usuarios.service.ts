import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { DatosUserModel } from 'src/app/modelos/datos-user.model';
import { DatosAsesorModel } from 'src/app/modelos/datos-asesor-model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url= 'http://localhost:3000';
  infoSesion: BehaviorSubject<DatosSesionModel> = new BehaviorSubject<DatosSesionModel>(new DatosSesionModel())
  
  
  constructor(
    private Http: HttpClient
    ){ 
  }
  
  registrarU(usuario:DatosUserModel):Observable<DatosUserModel>{  
    return this.Http.post<DatosUserModel>(`${this.url}/RegistroUsuarios`,{
      nombres: usuario.nombres,
      cedula: usuario.cedula,
      celular: usuario.celular,
      email: usuario.email,
      ciudad: usuario.ciudad
    },{
    headers: new HttpHeaders({})
    });
  }

  registrarAsesor(asesor:DatosAsesorModel):Observable<DatosAsesorModel>{
    return this.Http.post<DatosAsesorModel>(`${this.url}/RegistroUsuarios`,{
      nombres: asesor.nombres,
      email: asesor.email,
      cedula: asesor.cedula,
      ciudad: asesor.ciudad,
      celular: asesor.celular
    },{
      headers: new HttpHeaders({})
    });
  }
}
