import {Model, model, property} from '@loopback/repository';

@model()
export class CambioPass extends Model {
  @property({
    type: 'string',
    required: true,
  })
  cActual: string;

  @property({
    type: 'string',
    required: true,
  })
  cNueva: string;

  @property({
    type: 'string',
    required: true,
  })
  cValidada: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<CambioPass>) {
    super(data);
  }
}

export interface CambioPassRelations {
  // describe navigational properties here
}

export type CambioPassWithRelations = CambioPass & CambioPassRelations;
