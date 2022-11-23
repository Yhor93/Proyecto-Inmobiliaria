export class inmuebleModel {
  id?: string;
  tipoInmueble?: ['Casa', 'Apartamento', 'Local'];
  valor?: string;
  fotografias?: string;
  tipoOferta?: ['Venta', 'Alquiler'];
  estadoAlquiler?: string;
  estadoCompra?: string;
  encargado?: string;
  contactoEncargado?: string;
  departamento?: string;
  cuidad?: string;
  direccion?: string;
  contrato?: string;
  enlaceVideo?: string;
  asesorId?: string;
  solicitudId?: string;
}
