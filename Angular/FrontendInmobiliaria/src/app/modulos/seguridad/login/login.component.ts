import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
declare const generarVentanaModal:any;
import {MD5} from 'crypto-js';
//const CryptoJS = require('crypto-js');
//import * as cryptoJS from "crypto-js";
import { credencialesUsuarioModel } from 'src/app/modelos/credencialesUsuario.modelo';
import { LocalStorageService } from 'src/app/servicios/shared/local-storage.service';
import { DatosSesionModel } from 'src/app/modelos/datos-sesion.models';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fLoginValidador: FormGroup = new FormGroup({});
  siteKey: string = '';

   constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicioLocalStorage: LocalStorageService,
    private router: Router
    ){ 
      this.siteKey= "6LcmFS4jAAAAADKJx5TZPt-EW0t8jKeB_0W-D1vP";
    }

  ngOnInit(): void {
    this.LoginUsuario();
   }

  LoginUsuario(){
    this.fLoginValidador=this.fb.group({
      usuario:["",[Validators.required,Validators.email]],
      clave: ["",[Validators.required]],
      recaptcha: [,[Validators.required]]
    });
  }

  Login(){
    if(this.fLoginValidador.invalid){
      generarVentanaModal("Datos Invalidos");
    }else{
      let datos = new credencialesUsuarioModel();
      datos.usuario=this.fLoginValidador.controls['usuario'].value;
      datos.clave=MD5(this.fLoginValidador.controls['clave'].value).toString();
      this.servicioSeguridad.Logueo(datos).subscribe({
        next: (data:DatosSesionModel)=>{
        console.log(data);
        let guardar = this.servicioLocalStorage.guardarDatosSesion(data);
        data.Logueado=true;
        this.servicioSeguridad.verificarSesionActiva();
        this.router.navigate(['inicio']);
      },
        error: (e)=>console.log(e)
      });
      
    }
  }
}
