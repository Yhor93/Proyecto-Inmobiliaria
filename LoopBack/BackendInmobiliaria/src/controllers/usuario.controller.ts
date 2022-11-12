import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {keys} from '../configuracion/keys';
import {Credenciales, Usuario} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository, UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    @repository(ClienteRepository)
    public clienteRepo: ClienteRepository,
    @repository(AsesorRepository)
    public asesorRepo: AsesorRepository,
    @repository(AdministradorRepository)
    public administradorRepo: AdministradorRepository,
    @repository(UsuarioRepository)
    public usuarioRepo: UsuarioRepository
  ) { }

  @post('/RegistroUsuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let clave = this.servicioAutenticacion.GenerarPassword();
    //console.log("la clave es " + clave);
    let clavecifrada = this.servicioAutenticacion.EncriptarPassword(clave);
    usuario.clave = clavecifrada;

    let user = await this.usuarioRepository.create(usuario);
    if (usuario.perfil == "cliente") {
      let p = await this.clienteRepo.create(usuario);
    } else if (usuario.perfil == "asesor") {
      let p = this.asesorRepo.create(usuario);
    } else if (usuario.perfil == "administrador") {
      let p = this.administradorRepo.create(usuario);
    }
    //Notificaciòn
    let destino = user.email;
    let asunto = 'Registro en la APP - ';
    let contenido = `Hola, ${user.nombres}, su nombre de usuario es: ${user.email}
    y su contraseña de acceso a nuestra app es: ${clave}`;

    fetch(`${keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    return user;


  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @post('/Login')
  @response(200, {
    description: "Logueo de usuario a la app"
  })
  async identificarT(
    @requestBody() credenciales: Credenciales
  ) {
    credenciales.password = this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let u = await this.servicioAutenticacion.IdentificarUsuario(credenciales);
    if (u) {
      let token = this.servicioAutenticacion.GeneracionToken(u);
      return {
        datos: {
          nombres: u.nombres,
          id: u.id
        },
        tk: token

      }
    } else {
      throw new HttpErrors[401]("Datos invalidos");
    }

  }
}
