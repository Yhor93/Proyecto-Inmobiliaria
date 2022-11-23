export class DatosUserModel{
    id?: string;
    nombres?: string;
    cedula?: string;
    celular?: string;
    email?: string;
    ciudad?: string;
    roles?: ['Administrador','Asesor','Cliente'];
    perfil?: ['Administrador','Asesor','Cliente'];

}