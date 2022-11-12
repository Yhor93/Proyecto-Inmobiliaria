import { Component, OnInit } from '@angular/core';
declare const generarVentanaModal:any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    generarVentanaModal("Esta Ruta No Existe !")
  }

}
