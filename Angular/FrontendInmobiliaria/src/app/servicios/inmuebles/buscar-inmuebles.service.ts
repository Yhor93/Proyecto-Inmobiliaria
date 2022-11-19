import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { SeguridadService } from '../shared/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarInmueblesService {

  constructor(
    private http:HttpClient,
    private servicioSeguridad:SeguridadService
  ) { }

  consulatarinmuebles():Observable<inmuebleModel[]>{
    return this.http.get<inmuebleModel[]>(`${this.servicioSeguridad.url}/BuscarInmuebles`);   

  }
}
