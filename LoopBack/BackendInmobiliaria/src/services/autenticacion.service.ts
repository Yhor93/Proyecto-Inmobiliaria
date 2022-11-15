import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {keys} from '../configuracion/keys';
import {Credenciales, Usuario} from '../models';
import {ClienteRepository, UsuarioRepository} from '../repositories';
const generador = require("generate-password");
const cryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public repositorioCliente: ClienteRepository,
    @repository(UsuarioRepository)
    public userRepo: UsuarioRepository
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

  IdentificarUsuario(credenciales: Credenciales) {
    try {
      let p = this.userRepo.findOne({
        where: {
          email: credenciales.usuario,
          clave: credenciales.clave
        }, include: ['roles']
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GeneracionToken(usuario: Usuario) {
    let token = JWT.sign({
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombres,
        rol: [usuario.roles],
        cedula: usuario.cedula,
        ciudad: usuario.ciudad,
        celular: usuario.celular,
        codeudor: usuario.codeudor,
        perfil: usuario.perfil
      }
    },
      keys.llavesJWT);

    return token
  }

  validarToken(token: string) {

    try {

      let datos = JWT.verify(token, keys.llavesJWT);
      return datos;

    } catch {
      return false;

    }
  }

}


