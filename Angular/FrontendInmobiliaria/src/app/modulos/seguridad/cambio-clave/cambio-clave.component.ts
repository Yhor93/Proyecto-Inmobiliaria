import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css'],
})
export class CambioClaveComponent implements OnInit {
  fCambioC: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit(): void {
    this.formCambioclave();
  }

  formCambioclave() {
    this.fCambioC = this.fb.group({
      claveActual: ['', Validators.required],
      nuevaClave: ['', Validators.required],
      confirmarClave: ['', Validators.required],
    });
  }

   cambioC(){
  //   let datos = new CambioClaveModel();
  //   datos.claveActual=this.fCambioC.controls['claveActual'].value;
  //   datos.nuevaClave=this.fCambioC.controls['nuevaClave'].value;
  //   datos.confirmarClave=this.fCambioC.controls['confirmarClave'].value;
  //   this.servicioSeguridad.cambioClave(datos).subscribe({
  //     next: (data:CambioClaveModel)=>{
  //       console.log(data);

  //     },
  //       error: (e)=>console.log(e)

  //   })
  }
}
