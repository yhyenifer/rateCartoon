import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    title="Bienvenidos a RateCartoon";
  ngOnInit(){
    // camibios en el componente, cambio de pagina por ejemplo, sejecita despues del onInit
    // se ejecuta de manera global en la app
    console.log('init lanzado en home.component');

}
}
