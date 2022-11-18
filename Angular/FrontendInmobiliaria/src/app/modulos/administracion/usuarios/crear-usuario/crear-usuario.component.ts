import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosUserModel } from 'src/app/modelos/datos-user.model';
import { RolesModel } from 'src/app/modelos/roles.model';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  listaRoles:RolesModel[]=[];
  formularioRegistro: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService
  ){ }
   
  ngOnInit(): void {  
    this.roles();
  }

  formulario(){
    this.formularioRegistro=this.fb.group({
      nombre:[""],
      cedula:[""],
      celular:[""],
      email:[""],
      ciudad:[""],
      roles:[""]
    })
  }

  registroUsuarios(){
    if (this.formularioRegistro.invalid) {
      alert("Campos Obligatorios");
    } else {
      let usuario = new DatosUserModel();
      usuario.nombre=this.formularioRegistro.controls['nombre'].value;
      usuario.cedula=this.formularioRegistro.controls['cedula'].value;
      usuario.celular=this.formularioRegistro.controls['celular'].value;
      usuario.email=this.formularioRegistro.controls['email'].value;
      usuario.ciudad=this.formularioRegistro.controls['ciudad'].value;
      usuario.roles=this.formularioRegistro.controls['roles'].value;
    }
  }

  roles(){
    this.servicioSeguridad.obtenerRoles().subscribe({
      next: (data:RolesModel[])=>{
        this.listaRoles=data;
      },
        error:(e)=> console.log(e)
    })
  }
}
