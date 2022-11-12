import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { CrearAlquilerComponent } from './alquiler/crear-alquiler/crear-alquiler.component';
import { BuscarAlquilerComponent } from './alquiler/buscar-alquiler/buscar-alquiler.component';
import { EditarAlquilerComponent } from './alquiler/editar-alquiler/editar-alquiler.component';
import { EliminarAlquilerComponent } from './alquiler/eliminar-alquiler/eliminar-alquiler.component';
import { EliminarVentaComponent } from './venta/eliminar-venta/eliminar-venta.component';
import { EditarVentaComponent } from './venta/editar-venta/editar-venta.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { BuscarVentaComponent } from './venta/buscar-venta/buscar-venta.component';


@NgModule({
  declarations: [
    CrearAlquilerComponent,
    BuscarAlquilerComponent,
    EditarAlquilerComponent,
    EliminarAlquilerComponent,
    EliminarVentaComponent,
    EditarVentaComponent,
    CrearVentaComponent,
    BuscarVentaComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule
  ]
})
export class SolicitudesModule { }
