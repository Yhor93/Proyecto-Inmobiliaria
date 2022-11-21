import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { BuscarInmueblesService } from 'src/app/servicios/inmuebles/buscar-inmuebles.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  finmueble: FormGroup=new FormGroup({});
  id:string = this.route.snapshot.params["id"];

  constructor(
    private fb: FormBuilder,
    private servicioInmueble: BuscarInmueblesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.EdicionFormulario();
    this.consultar();
  }
  
  EdicionFormulario(){
    this.finmueble=this.fb.group({
      id:["",[Validators.required]],
      tipoInmueble:["",Validators.required],
      valor:["",Validators.required],
      fotografias:["",Validators.required],      
      tipoOferta:["",Validators.required],
      encargado:["",Validators.required],
      contactoEncargado:["",Validators.required],       
      departamento:["",Validators.required],
      cuidad:["",Validators.required],
      direccion:["",Validators.required],
      enlaceVideo:["",Validators.required]
    })
  }

  editar(){

  }

  consultar(){
    this.servicioInmueble.consultarinmueble(this.id).subscribe({
      next: (datos: inmuebleModel)=>{
        this.finmueble.controls["id"].setValue(datos.id);
        this.finmueble.controls["tipoInmueble"].setValue(datos.tipoInmueble);
        this.finmueble.controls["fotografias"].setValue(datos.fotografias);
        this.finmueble.controls["tipoOferta"].setValue(datos.tipoOferta);
        this.finmueble.controls["encargado"].setValue(datos.encargado);
        this.finmueble.controls["contactoEncargado"].setValue(datos.contactoEncargado);
        this.finmueble.controls["departamento"].setValue(datos.departamento);
        this.finmueble.controls["ciudad"].setValue(datos.cuidad);
        this.finmueble.controls["direccion"].setValue(datos.direccion);
        this.finmueble.controls["detalle"].setValue(datos.enlaceVideo);
      },
      error:(e)=>console.log(e) 

    });
  }

}
