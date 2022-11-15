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
  del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {keys} from '../configuracion/keys';

import {Cliente, Credenciales} from '../models';
import {ClienteRepository, UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public servicioautenticacion: AutenticacionService
  ) { }

  @post('/RegistroClientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {

    let password = this.servicioautenticacion.GenerarPassword();
    console.log("la clave es " + password);
    let passwordE = this.servicioautenticacion.EncriptarPassword(password);
    cliente.clave = passwordE;

    let c = await this.clienteRepository.create(cliente);
    let u = await this.usuarioRepository.create(cliente);
    //Notificaciòn
    let destino = c.email;
    let asunto = 'Registro en la APP - ';
    let contenido = `Hola, ${c.nombres}, su nombre de usuario es: ${c.email}
    y su contraseña de acceso a nuestra app es: ${password}`;

    fetch(`${keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    return c;
  }

  @get('/NumeroClientes')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/BuscarClientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/EditarClientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/BuscarClientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/EditarClientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/EditarClientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/EliminarClientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
  /* Mètodos Propios*/

  @post('/identificar-cliente', {
    responses: {
      '200': {
        description: "Identificaciòn del cliente"
      }
    }
  })
  async identificar(
    @requestBody() credenciales: Credenciales
  ): Promise<Cliente | null> {
    let clavecifrada = this.servicioautenticacion.EncriptarPassword(credenciales.clave);
    let cliente = await this.clienteRepository.findOne({
      where: {
        email: credenciales.usuario,
        clave: clavecifrada
      }
    });
    return cliente;

  }

  @post('/identificar-clienteT')
  @response(200, {
    description: "Identificaciòn del cliente con Generacion de token"
  })
  async identificarT(
    @requestBody() credenciales: Credenciales
  ) {
    credenciales.clave = this.servicioautenticacion.EncriptarPassword(credenciales.clave);
    let p = await this.servicioautenticacion.IdentificarUsuario(credenciales);
    if (p) {
      let token = this.servicioautenticacion.GeneracionToken(p);
      return {
        datos: {
          nombres: p.nombres,
          id: p.id
        },
        tk: token

      }
    } else {
      throw new HttpErrors[401]("Datos invalidos");
    }
  }

}
