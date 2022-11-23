import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidarSesionGuard } from 'src/app/guardianes/invalidar-sesion.guard';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
{
  path: 'login', 
  component: LoginComponent
},
{
  path: 'recuperar-clave', 
  component: RecuperarClaveComponent,
},
{
  path: 'cambio-clave', 
  component: CambioClaveComponent,
  canActivate:[ValidadorSesionGuard] 
},
{
  path: 'logout', 
  component: LogoutComponent,
  canActivate:[ValidadorSesionGuard] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
