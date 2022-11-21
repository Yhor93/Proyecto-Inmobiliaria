import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { BuscarInmueblesService } from 'src/app/servicios/inmuebles/buscar-inmuebles.service';
declare const generarVentanaModal:any

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  finmueble: FormGroup= new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private serviciobuscarinmueble: BuscarInmueblesService,
    private router: Router    
  ) { }

  ngOnInit(): void {
    this.construccionFormulario();
  }

  construccionFormulario(){
    this.finmueble=this.fb.group({
      tipoInmueble:["",Validators.required],
      valor:["",Validators.required],
      fotografias:["",Validators.required],      
      tipoOferta:["",Validators.required],
      encargado:["",Validators.required],
      contactoEncargado:["",Validators.required],       
      deparamento:["",Validators.required],
      cuidad:["",Validators.required],
      direccion:["",Validators.required],
      enlaceVideo:["",Validators.required]
    });
  }

  crear(){
    if(this.finmueble.invalid){
      generarVentanaModal("los Datos son invalidos")
    }else{
      let inmueble:inmuebleModel=new inmuebleModel();
      inmueble.tipoInmueble=this.finmueble.controls['tipoinmueble'].value;
      inmueble.valor=this.finmueble.controls['valor'].value;
      inmueble.fotografias=this.finmueble.controls['fotografia'].value;      
      inmueble.tipoOferta=this.finmueble.controls['tipoOferta'].value;
      inmueble.encargado=this.finmueble.controls['encargado'].value;
      inmueble.contactoEncargado=this.finmueble.controls['contactoEncargado'].value;            
      inmueble.departamento=this.finmueble.controls['departamento'].value;
      inmueble.cuidad=this.finmueble.controls['cuidad'].value;
      inmueble.direccion=this.finmueble.controls['direccion'].value;
      inmueble.enlaceVideo=this.finmueble.controls['enlaceVideo'].value;
      this.serviciobuscarinmueble.crearinmueble(inmueble).subscribe({
        next: (datos:inmuebleModel)=>{
          generarVentanaModal("El inmueble se Guardo de manera exitosa")
          this.router.navigate(["./buscar-inmueble"]);
        },
        error:(e)=>console.log(e)
      });
    }

  }

}
