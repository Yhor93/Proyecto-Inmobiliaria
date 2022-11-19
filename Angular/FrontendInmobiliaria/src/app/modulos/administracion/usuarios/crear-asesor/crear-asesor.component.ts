import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesModel } from 'src/app/modelos/roles.model';
import { UsuariosService } from 'src/app/servicios/administracion/usuarios.service';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-crear-asesor',
  templateUrl: './crear-asesor.component.html',
  styleUrls: ['./crear-asesor.component.css']
})
export class CrearAsesorComponent implements OnInit {

  listaRoles:RolesModel[]=[];
  formularioRegistro: FormGroup = new FormGroup({});


  constructor(
    private fb:FormBuilder,
    private servicioUsuario: UsuariosService
    ) { }

  ngOnInit(): void {
    this.formulario();
    this.roles();
  }
  roles() {
  
  }
  formulario() {
    this.formularioRegistro=this.fb.group({
      nombre:["",Validators.required],
      email:["",Validators.required],
      cedula:["",Validators.required],
      ciudad:["",Validators.required],
      celular:["",Validators.required],
      roles:["usuario"]
    });
  }

  
}
