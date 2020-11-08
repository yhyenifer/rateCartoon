import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, DoCheck, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { CartoonService } from '../../services/cartoons.service';


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

   enviarDatos(){
     this.comentario = document.getElementById('comment');
     console.log(this.comentario.value);
     
    this.activeModal.close(['Enviar',this.comentario.value])
   }
}


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
  comentario : string;
  objRate: { rate: number; comment: any; };
  constructor(private modalService: NgbModal,
    public cartoonService : CartoonService) { }
  ngOnInit() {
    this.searchCartoon();
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.currentRate = this.currentRate;
    modalRef.closed.subscribe(result =>{
      if(result[0]=='Enviar'){
        console.log(this.alert.nativeElement);
        this.alert.nativeElement.classList.add('show');
        setTimeout(() => {
          this.alert.nativeElement.classList.remove('show');
        }, 3000);
        this.objRate = {
          rate: this.currentRate,
          comment: result[1]
        }
        console.log('Guardar en Persistencia');
        console.table(this.objRate);
        this.currentRate = 0;
        this.searchCartoon();
        
      }
     
    })
  }

  random(){
    return Math.floor(Math.random() * (2382 - 1) + 1);
  }

  searchCartoon(){
    this.currentRate = 0;
    let number = this.random();
   this.cartoonService.searchCartoons(number)
   .subscribe( data =>{
     this.cartoonInfo = data;
     this.year = this.cartoonInfo.year;
     this.title = this.cartoonInfo.title;
     this.img = this.cartoonInfo.img;
     
   })
  }

}
