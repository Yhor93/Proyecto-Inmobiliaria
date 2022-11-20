import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { CrearInmuebleComponent } from './inmuebles/crear-inmueble/crear-inmueble.component';
import { BuscarInmuebleComponent } from './inmuebles/buscar-inmueble/buscar-inmueble.component';
import { EliminarInmuebleComponent } from './inmuebles/eliminar-inmueble/eliminar-inmueble.component';
import { EditarInmuebleComponent } from './inmuebles/editar-inmueble/editar-inmueble.component';
import { MisionComponent } from './informacion/mision/mision.component';
import { VisionComponent } from './informacion/vision/vision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VistaInmueblesComponent } from './informacion/vista-inmuebles/vista-inmuebles.component';
import { CrearAsesorComponent } from './usuarios/crear-asesor/crear-asesor.component';
import { CasasComponent } from './inmuebles/casas/casas.component';
import { ApartamentosComponent } from './inmuebles/apartamentos/apartamentos.component';
import { LocalesComercialesComponent } from './inmuebles/locales-comerciales/locales-comerciales.component';


@NgModule({
  declarations: [
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    BuscarUsuarioComponent,
    CrearInmuebleComponent,
    BuscarInmuebleComponent,
    EliminarInmuebleComponent,
    EditarInmuebleComponent,
    MisionComponent,
    VisionComponent,
    VistaInmueblesComponent,
    CrearAsesorComponent,
    CasasComponent,
    ApartamentosComponent,
    LocalesComercialesComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class AdministracionModule { }
