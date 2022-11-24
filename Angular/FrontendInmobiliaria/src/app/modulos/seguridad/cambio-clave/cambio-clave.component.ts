import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/servicios/shared/local-storage.service';
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
    private servicioSeguridad: SeguridadService,
    private servicioLocalStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.formCambioclave();
  }

  formCambioclave() {
    this.fCambioC = this.fb.group({
      claveActual: ['', Validators.required],
      nuevaClave: ['', Validators.required],
      cValidada: ['', Validators.required],
    });
  }

  cambioC() {
    //   let datos = new CambioClaveModel();
    //   let localStorage = new LocalStorageService();
    //   let datoSesion = localStorage.obtenerSesionInfo();
    //   datos.claveActual = this.fCambioC.controls['claveActual'].value;
    //   datos.nuevaClave = this.fCambioC.controls['nuevaClave'].value;
    //   datos.cValidada = this.fCambioC.controls['cValidada'].value;
    //   datos.email = datoSesion.datos.email;
    //   this.servicioSeguridad.cambioClave(datos).subscribe({
    //     next: (data: boolean) => {
    //       console.log(data);
    //     },
    //     error: (e) => console.log(e),
    //   });
  }
}
