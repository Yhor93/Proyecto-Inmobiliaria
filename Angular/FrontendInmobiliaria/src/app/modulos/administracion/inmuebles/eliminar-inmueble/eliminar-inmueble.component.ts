import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { BuscarInmueblesService } from 'src/app/servicios/inmuebles/buscar-inmuebles.service';
declare const generarVentanaModal:any;

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  id:string= this.route.snapshot.params["id"];
  inmueble: inmuebleModel = new inmuebleModel();

  constructor(
    private servicioInmueble: BuscarInmueblesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.servicioInmueble.consultarinmueble(this.id).subscribe({
      next:(data: inmuebleModel)=>{
        this.inmueble=data;
      }
    })
  }

  Eliminar(){
    this.servicioInmueble.EliminarInmueble(this.id).subscribe({
      next:(data:any)=>{
        generarVentanaModal("Registro Eliminado Exitosamente");
        this.router.navigate(["administracion/buscar-inmueble"]);
      },
      error: (e)=>console.log(e)
      
    })
  }

}
