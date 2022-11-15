import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  component: RecuperarClaveComponent
},
{
  path: 'cambio-clave', 
  component: CambioClaveComponent
},
{
  path: 'logout', 
  component: LogoutComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
