import { Injectable } from '@angular/core';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  guardarDatosSesion(datos: DatosSesionModel) {
    let datosActuales = localStorage.getItem('datosSesionInmobiliaria');
    if (datosActuales) {
      return false;
    } else {
      let datosSesionString = JSON.stringify(datos);
      localStorage.setItem('datosSesionInmobiliaria', datosSesionString);
      return true;
    }
  }

  eliminarDatosSesion() {
    let datosActuales = localStorage.getItem('datosSesionInmobiliaria');
    if (datosActuales) {
      localStorage.removeItem('datosSesionInmobiliaria');
      return true;
    } else {
      return false;
    }
  }

  obtenerToken(): string {
    let datosActuales = localStorage.getItem('datosSesionInmobiliaria');
    if (datosActuales) {
      let datosSesionJson = JSON.parse(datosActuales);
      return datosSesionJson.tk;
    } else {
      return '';
    }
  }

  obtenerSesionInfo(): DatosSesionModel | null {
    let datosActuales = localStorage.getItem('datosSesionInmobiliaria');
    if (datosActuales) {
      let datosSesionJson = JSON.parse(datosActuales);
      return datosSesionJson;
    } else {
      return null;
    }
  }
}
