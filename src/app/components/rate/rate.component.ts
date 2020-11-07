import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.sass']
})
export class RateComponent implements OnInit {
  currentRate = 0;
    title="Bienvenidos a RateCartoon";
  ngOnInit(){
    // camibios en el componente, cambio de pagina por ejemplo, sejecita despues del onInit
    // se ejecuta de manera global en la app
    console.log('init lanzado en rate.component');

}
}
