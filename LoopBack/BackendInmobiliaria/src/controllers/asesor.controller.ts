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
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Asesor, Credenciales} from '../models';
//import {Asesor} from '../models';
import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {AsesorRepository, UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
import { keys } from '../configuracion/keys';
const fetch = require('node-fetch');

@authenticate("administrador")
export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public servicioautenticacion: AutenticacionService

  ) { }

  @post('/RegistroAsesor')
  @response(200, {
    description: 'Asesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    let password = this.servicioautenticacion.GenerarPassword();
    let passwordE = this.servicioautenticacion.EncriptarPassword(password);
    asesor.clave = passwordE;

    let as = await this.asesorRepository.create(asesor);
    let u = await this.usuarioRepository.create(asesor);
    //Notificaciòn
    let destino = as.email;
    let asunto = 'Registro en la APP - ';
    let contenido = `Hola, ${as.nombres}, su nombre de usuario es: ${as.email}
    y su contraseña de acceso a nuestra app es: ${password}`;

    fetch(`${keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    return as;




  }

  @get('/NumeroAsesores')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/BuscarAsesores')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/EditarAsesores')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/BuscarAsesores/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/EditarAsesores/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/Asesores/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/EliminarAsesores/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }

  /* Mètodos Propios*/

  @post('/identificar-asesor', {
    responses: {
      '200': {
        description: "Identificaciòn del asesor"
      }
    }
  })
  async identificar(
    @requestBody() credenciales: Credenciales
  ): Promise<Asesor | null> {
    let clavecifrada = this.servicioautenticacion.EncriptarPassword(credenciales.clave);
    let asesor = await this.asesorRepository.findOne({
      where: {
        email: credenciales.usuario,
        clave: clavecifrada
      }
    });
    return asesor;

  }




}
