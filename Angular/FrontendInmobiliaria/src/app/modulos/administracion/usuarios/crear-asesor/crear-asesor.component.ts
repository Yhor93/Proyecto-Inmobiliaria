import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosAsesorModel } from 'src/app/modelos/datos-asesor-model';
import { DatosUserModel } from 'src/app/modelos/datos-user.model';
import { RolesModel } from 'src/app/modelos/roles.model';
import { UsuariosService } from 'src/app/servicios/administracion/usuarios.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
declare const generarVentanaModal:any;


@Component({
  selector: 'app-crear-asesor',
  templateUrl: './crear-asesor.component.html',
  styleUrls: ['./crear-asesor.component.css']
})
export class CrearAsesorComponent implements OnInit {

  listaRoles:RolesModel[]=[];
  formularioRegistroAsesor: FormGroup = new FormGroup({});


  constructor(
    private fb:FormBuilder,
    private servicioUsuario: UsuariosService,
    private servicioSeguridad: SeguridadService
    ) { }

  ngOnInit(): void {
    this.formularioAsesor();
    this.roles();
  }
  roles() {
    this.servicioSeguridad.obtenerRoles().subscribe({
      next: (data:RolesModel[])=>{
        this.listaRoles=data;
      },
        error:(e)=> console.log(e)
    })
  }
  formularioAsesor() {
    this.formularioRegistroAsesor=this.fb.group({
      id:["6379b62ec3a0870554ef4843"],
      nombre:["",Validators.required],
      email:["",Validators.required],
      cedula:["",Validators.required],
      ciudad:["",Validators.required],
      celular:["",Validators.required],
      roles:["asesor"],
      perfil:["asesor"]
    });
  }
  
  registroAsesor(){
       let asesor:DatosUserModel = new DatosUserModel();
       asesor.id=this.formularioRegistroAsesor.controls['id'].value;
       asesor.nombres=this.formularioRegistroAsesor.controls['nombre'].value;
       asesor.cedula=this.formularioRegistroAsesor.controls['cedula'].value;
       asesor.celular=this.formularioRegistroAsesor.controls['celular'].value;
       asesor.email=this.formularioRegistroAsesor.controls['email'].value;
       asesor.ciudad=this.formularioRegistroAsesor.controls['ciudad'].value;
       asesor.roles=this.formularioRegistroAsesor.controls['roles'].value;
       console.log(asesor);
       this.servicioUsuario.registrarAsesor(asesor).subscribe({
        next: (datos:DatosUserModel)=>{
          generarVentanaModal("Asesor Registrado Exitosamente !!");
        },
        error: (e)=>console.log(e)
       });
     
   }
  
}
