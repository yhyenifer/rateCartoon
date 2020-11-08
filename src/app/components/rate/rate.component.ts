import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, DoCheck, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { CartoonService } from '../../services/cartoons.service';
import * as moment from 'moment';

/**
* @component NgbdModalContent
* @description componente de la modal comentario de la calificacion
* @author Yenifer Hernandez
* @date 08/11/2020
*/
@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./rate.component.sass'],
})
export class NgbdModalContent {
  @Input() currentRate = '';
  comentario: any;

  constructor(public activeModal: NgbActiveModal) {

  }

  /**
   * @function enviarDatos()
   * @description permite el envio de parametros de la modal a l pagina padre
   * @author Yenifer Hernandez
   * @date 08/11/2020
   */

  enviarDatos() {
    this.comentario = document.getElementById('comment');
    this.activeModal.close(['Enviar', this.comentario.value])
  }
}


/**
* @component RateComponent
* @description componente de la pagina calificar
* @author Yenifer Hernandez
* @date 08/11/2020
*/
@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.sass']
})
export class RateComponent implements OnInit {
  @ViewChild('send', { static: true }) alert: ElementRef;
  currentRate = 0;
  cartoonInfo: any;
  year: any;
  title: any;
  img: any;
  comentario: string;
  objRate: { rate: number; comment: any; id: any };
  idCartoon: any;
  hoy: string;
  resul: any;
  number: number;

  constructor(private modalService: NgbModal,
    public cartoonService: CartoonService) { }
/**
 * @function ngOnInit()
 * @description funcion de inicio, permite hacer el llamado a funciones de parametros iniciales
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */   
  ngOnInit() {
    this.hoy = moment().format('DD/MM/YYYY');
    this.searchCurrentCartoon();
  }
/**
 * @function open()
 * @description funcion que permite abrir la modal para solicitar un comentario sobre la calificacion
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.currentRate = this.currentRate;
    modalRef.closed.subscribe(result => {
      if (result[0] == 'Enviar') {
        //mostrar alert indicando exito 
        this.alert.nativeElement.classList.add('show');
        // esperar para cerrar la alerta con un tiempo
        setTimeout(() => {
          this.alert.nativeElement.classList.remove('show');
        }, 3000);
        //objeto para persistencia
        this.objRate = {
          rate: this.currentRate,
          comment: result[1],
          id: this.idCartoon
        }
        //persistencia
        console.log('Guardar en Persistencia');
        console.table(this.objRate);
        this.currentRate = 0;
        // cargar una nueva cartoon
        this.searchCurrentCartoon();

      }

    })
  }
/**
 * @function random()
 * @description funcion que generar un numero aleatorio en un limite deperminado
 * @param limit limite
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */
  random(limit) {
    return Math.floor(Math.random() * (limit - 1) + 1);
  }
/**
 * @function searchCartoon()
 * @description funcion que permite hacer la solicitud de consulta historietas de manera aleatoria
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */
  searchCartoon() {
    this.currentRate = 0;
    let number = this.random(this.number);
    //llamado al servicio
    this.cartoonService.searchCartoons(number)
      .subscribe(data => {
        this.cartoonInfo = data;
        this.idCartoon = this.cartoonInfo.num;
        this.year = this.cartoonInfo.year;
        this.title = this.cartoonInfo.title;
        this.img = this.cartoonInfo.img;

      })
  }
/**
 * @function searchCurrentCartoon()
 * @description funcion que permite consultar el ultimo numero de historieta publicado
 * @returns numero maximo de historietas
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */
  searchCurrentCartoon(){
    // si no hay limite se consulta
    if(sessionStorage.getItem('limit') == null){
        this.cartoonService.searchCartoonsCurrent()
        .subscribe(data=>{
          this.resul = data;
          sessionStorage.setItem('limit', this.resul.num);
          sessionStorage.setItem('fecha', this.hoy);
          this.number =parseInt(this.resul.num);
          this.searchCartoon();
        })
    }else{
      // se hay limite pero la fecha en que se guardo es igual a la de hoy, se consulta localmente el limite
      if(this.hoy == sessionStorage.getItem('fecha')){
        this.number = parseInt(sessionStorage.getItem('limit'));
        this.searchCartoon();
      }else{
      // se hay limite pero la fecha en que se guardo es diferente a la de hoy, se consulta 
        this.cartoonService.searchCartoonsCurrent()
        .subscribe(data=>{
          this.resul = data;
          sessionStorage.setItem('limit', this.resul.num);
          sessionStorage.setItem('fecha', this.hoy);
          this.number =  parseInt(this.resul.num);
          this.searchCartoon();
        })
      }
    }
   
  }

}
