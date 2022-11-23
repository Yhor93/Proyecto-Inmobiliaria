import { Component, OnInit } from '@angular/core';
import { inmuebleModel } from 'src/app/modelos/inmueble.model';
import { BuscarInmueblesService } from 'src/app/servicios/inmuebles/buscar-inmuebles.service';
declare const generarVentanaModal: any;

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css'],
})
export class CasasComponent implements OnInit {
  listainmuebles: inmuebleModel[] = [];

  constructor(private servicioInmueble: BuscarInmueblesService) {}

  ngOnInit(): void {
    this.ConsultarInmuebles();
  }

  ConsultarInmuebles() {
    this.servicioInmueble.consulatarinmuebles().subscribe({
      next: (datos: inmuebleModel[]) => {
        this.listainmuebles = datos;
      },
      error: (e) => console.log(e),
    });
  }

  mensaje() {
    generarVentanaModal(
      'En estos momentos nuestros asesores se encuentran ocupados, nos estaremos comunicando muy pronto,' +
        ' por favor este pendiente de su celular y/o email. <br><br>' +  ' Gracias por entender'
    );
  }
}

