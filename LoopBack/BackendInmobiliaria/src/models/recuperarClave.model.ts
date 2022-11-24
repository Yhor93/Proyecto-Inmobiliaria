import {Model, model, property } from "@loopback/repository";

@model()
export class recuperarClave extends Model{
 @property({
  type: 'string',
  required: true,
 })
 email: string;

 constructor(data?: Partial<recuperarClave>) {
  super(data);
}
}
export interface recuperarClaveRelations {
  // describe navigational properties here
}

export type recuperarClaveWithRelations = recuperarClave & recuperarClaveRelations;