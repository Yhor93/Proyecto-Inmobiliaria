import { DatosUserModel } from "./datos-user.model";

export class DatosSesionModel{
    datos?: DatosUserModel;
    tk?: string;
    Logueado: boolean=false;
}