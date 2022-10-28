import {Entity, model, property} from '@loopback/repository';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tipoInmueble: string[];

  @property({
    type: 'number',
    required: true,
  })
  valor: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografias: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tipoOferta: string[];

  @property({
    type: 'boolean',
    required: true,
  })
  estadoAlquiler: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoCompra: boolean;

  @property({
    type: 'string',
    required: true,
  })
  encargado: string;

  @property({
    type: 'string',
    required: true,
  })
  contactoEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  cuidad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
  })
  contrato?: string;

  @property({
    type: 'string',
  })
  enlaceVideo?: string;

  @property({
    type: 'string',
  })
  asesorId?: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
