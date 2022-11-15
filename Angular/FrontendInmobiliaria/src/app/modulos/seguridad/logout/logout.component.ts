import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { LocalStorageService } from 'src/app/servicios/shared/local-storage.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private servicioSeguridad: SeguridadService,
    private servicioLocalStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.servicioLocalStorage.eliminarDatosSesion();
    this.servicioSeguridad.actualizarDatosSesion(new DatosSesionModel());
    this.router.navigate(["inicio"]);
  }

}
