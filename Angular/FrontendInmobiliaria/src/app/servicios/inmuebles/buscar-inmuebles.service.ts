import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { LocalStorageService } from '../shared/local-storage.service';
import { SeguridadService } from '../shared/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarInmueblesService {

  constructor(
    private http:HttpClient,
    private servicioSeguridad:SeguridadService,
    private servicioLocalStorage:LocalStorageService
  ) { }

  tk: string = this.servicioLocalStorage.obtenerToken();

  consulatarinmuebles():Observable<inmuebleModel[]>{
    return this.http.get<inmuebleModel[]>(`${this.servicioSeguridad.url}/BuscarInmuebles`);   

  }
  crearinmueble(inmueble: inmuebleModel):Observable<inmuebleModel>{
    return this.http.post<inmuebleModel>(`${this.servicioSeguridad.url}/RegistroInmuebles`,{
      
      tipoInmueble:inmueble.tipoInmueble,
      valor: inmueble.valor,
      fotografias: inmueble.fotografias,
      tipoOferta: inmueble.tipoOferta,         
      encargado: inmueble.encargado,
      contactoEncargado: inmueble.contactoEncargado,
      departamento: inmueble.departamento,
      cuidad: inmueble.cuidad,
      direccion: inmueble.direccion,      
      enlaceVideo: inmueble.enlaceVideo, 
         
    },
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`
      })
    });
  }

  consultarinmueble(id:string):Observable<inmuebleModel>{
    return this.http.get<inmuebleModel>(`${this.servicioSeguridad.url}/BuscarInmuebles/${id}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tk}`
      })
    })
  }
    EliminarInmueble(id:string):Observable<any>{
      return this.http.delete(`${this.servicioSeguridad.url}/EliminarInmuebles/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.tk}`
        })
      })
    }
  
}
