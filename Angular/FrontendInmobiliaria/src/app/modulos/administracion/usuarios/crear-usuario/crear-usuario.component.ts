import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosUserModel } from 'src/app/modelos/datos-user.model';
import { RolesModel } from 'src/app/modelos/roles.model';
import { UsuariosService } from 'src/app/servicios/administracion/usuarios.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
declare const generarVentanaModal:any;


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
    private servicioSeguridad: SeguridadService,
    private servicioUsuario: UsuariosService
  ){ }
   
  ngOnInit(): void {  
    this.formulario();
    this.roles();
  }
 //Metodo
  formulario(){
    this.formularioRegistro=this.fb.group({
      nombre:["",Validators.required],
      cedula:["",Validators.required],
      celular:["",Validators.required],
      email:["",Validators.required],
      ciudad:["",Validators.required],
      roles:["usuario"],
      
    });
  }
 //Funcion
   registroUsuarios(){
    //  if (this.formularioRegistro.invalid) {
    //    generarVentanaModal("Campos Obligatorios");
    //   } else {
       let usuario:DatosUserModel = new DatosUserModel();
       usuario.nombres=this.formularioRegistro.controls['nombre'].value;
       usuario.cedula=this.formularioRegistro.controls['cedula'].value;
       usuario.celular=this.formularioRegistro.controls['celular'].value;
       usuario.email=this.formularioRegistro.controls['email'].value;
       usuario.ciudad=this.formularioRegistro.controls['ciudad'].value;
       usuario.roles=this.formularioRegistro.controls['roles'].value;
       console.log(usuario);
       this.servicioUsuario.registrarU(usuario).subscribe({
        next: (datos:DatosUserModel)=>{
          generarVentanaModal("Registro Exitoso!!, su clave de acceso sera enviada a su email");
        },
        error: (e)=>console.log(e)
       });
     // }
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
