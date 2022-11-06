import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import { repository } from '@loopback/repository';
import { keys } from '../configuracion/keys';
import { Cliente, Credenciales } from '../models';
import { ClienteRepository } from '../repositories';
const generador = require("generate-password");
const cryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository (ClienteRepository)
    public repositorioCliente:ClienteRepository 
  ) { }
  
  
  GenerarPassword() {
    let password = generador.generate({
      length: 8,
      numbers: true
    });
    return password;
  }

  EncriptarPassword(password: string) {
    let passwordE = cryptoJS.MD5(password);
    return passwordE;
  }

  IdentificarUsuario(credenciales: Credenciales){
    try {
      let p = this.repositorioCliente.findOne({
        where:{
            email: credenciales.usuario,
            clave: credenciales.password
          }
        });
        if (p){
        return p;
        }
        return false;
    } catch {
      return false;  
     }
    }

    GeneracionToken(cliente: Cliente){
      let token=JWT.sign({
        data:{
          id:cliente.id,
          email:cliente.email,
          nombre:cliente.nombres+" "+cliente.apellidos,
        }
      },
      keys.llavesJWT);

      return token
    }

    validarToken(token:string){

      try {

        let datos=JWT.verify(token,keys.llavesJWT);
        return datos;
        
      } catch  {
        return false;
        
      }
    }

}


