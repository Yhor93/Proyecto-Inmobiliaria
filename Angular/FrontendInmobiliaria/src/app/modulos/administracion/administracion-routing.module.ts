import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionComponent } from './informacion/mision/mision.component';
import { VisionComponent } from './informacion/vision/vision.component';
import { BuscarInmuebleComponent } from './inmuebles/buscar-inmueble/buscar-inmueble.component';
import { CrearInmuebleComponent } from './inmuebles/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmuebles/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmuebles/eliminar-inmueble/eliminar-inmueble.component';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { InvalidarSesionGuard } from 'src/app/guardianes/invalidar-sesion.guard';
import { CrearAsesorComponent } from './usuarios/crear-asesor/crear-asesor.component';
import { VistaInmueblesComponent } from './informacion/vista-inmuebles/vista-inmuebles.component';
import { CasasComponent } from './inmuebles/casas/casas.component';
import { ApartamentosComponent } from './inmuebles/apartamentos/apartamentos.component';
import { LocalesComercialesComponent } from './inmuebles/locales-comerciales/locales-comerciales.component';

const routes: Routes = [
  {
    path: 'registrarse',
    component: CrearUsuarioComponent,
    canActivate: [InvalidarSesionGuard]
  },
  {
    path: 'editar-usuario',
    component: EditarUsuarioComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'eliminar-usuario',
    component: EliminarUsuarioComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'buscar-usuario',
    component: BuscarUsuarioComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'crear-inmueble',
    component: CrearInmuebleComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'editar-inmueble/:id',
    component: EditarInmuebleComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'eliminar-inmueble/:id',
    component: EliminarInmuebleComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'buscar-inmueble',
    component: BuscarInmuebleComponent,
    canActivate:[ValidadorSesionGuard] 
  },
  {
    path: 'mision',
    component: MisionComponent
  },
  {
    path: 'vision',
    component: VisionComponent
  },
  {
    path: 'crear-asesor',
    component: CrearAsesorComponent
  },
  {
    path: 'vista-inmuebles',
    component: VistaInmueblesComponent
  },
  {
    path: 'casas',
    component: CasasComponent
  },
  {
    path: 'apartamentos',
    component: ApartamentosComponent
  },
  {
    path: 'locales-comerciales',
    component: LocalesComercialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
