import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, DoCheck, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { CartoonService } from '../../services/cartoons.service';

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

  constructor(private modalService: NgbModal,
    public cartoonService: CartoonService) { }
/**
 * @function ngOnInit()
 * @description funcion de inicio, permite hacer el llamado a funciones de parametros iniciales
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */   
  ngOnInit() {
    this.searchCartoon();
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
        this.searchCartoon();

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
    let number = this.random(2382);
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

}
