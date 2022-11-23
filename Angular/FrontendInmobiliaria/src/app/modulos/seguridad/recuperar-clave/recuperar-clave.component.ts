import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
declare const generarVentanaModal: any;

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css'],
})
export class RecuperarClaveComponent implements OnInit {
  userEmail: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit(): void {
    this.fRecuperarClave();
  }

  fRecuperarClave() {
    this.userEmail = this.fb.group({
      email: ['', Validators.required],
    });
  }

  recuClave() {
    let email= this.userEmail.controls['email'].value;
    console.log(typeof 'email');    
    this.servicioSeguridad.recuperarClave(email).subscribe({
      next: (data: boolean) => {
        generarVentanaModal('Su nueva contraseña Se ha enviado al email');
      },
      error: (e) => console.log(e),
    });   
  }
}
