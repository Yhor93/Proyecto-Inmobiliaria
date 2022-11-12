import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarAlquilerComponent } from './alquiler/buscar-alquiler/buscar-alquiler.component';
import { CrearAlquilerComponent } from './alquiler/crear-alquiler/crear-alquiler.component';
import { EditarAlquilerComponent } from './alquiler/editar-alquiler/editar-alquiler.component';
import { EliminarAlquilerComponent } from './alquiler/eliminar-alquiler/eliminar-alquiler.component';
import { BuscarVentaComponent } from './venta/buscar-venta/buscar-venta.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { EditarVentaComponent } from './venta/editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './venta/eliminar-venta/eliminar-venta.component';

const routes: Routes = [
  {
    path: 'crear-alquiler',
    component: CrearAlquilerComponent
  },
  {
    path: 'editar-alquiler',
    component: EditarAlquilerComponent
  },
  {
    path: 'eliminar-alquiler',
    component: EliminarAlquilerComponent
  },
  {
    path: 'buscar-alquiler',
    component: BuscarAlquilerComponent
  },
  {
    path: 'crear-venta',
    component: CrearVentaComponent
  },
  {
    path: 'editar-venta',
    component: EditarVentaComponent
  },
  {
    path: 'eliminar-venta',
    component: EliminarVentaComponent
  },
  {
    path: 'buscar-venta',
    component: BuscarVentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
