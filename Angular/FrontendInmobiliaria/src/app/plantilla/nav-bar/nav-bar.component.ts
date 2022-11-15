import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sesionActiva:boolean=false;
  subscription:Subscription=new Subscription();

  constructor(
    private servicioSeguridad : SeguridadService
  ) { }

  ngOnInit(): void {
    this.estadoSesion();
  }

  estadoSesion(){
    this.subscription = this.servicioSeguridad.obtenerInfoSesion().subscribe({
      next: (datos:DatosSesionModel)=>{
        this.sesionActiva=datos.Logueado;
      }
    });
  }
}
