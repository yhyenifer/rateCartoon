import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { CartoonService } from 'src/app/services/cartoons.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <div class="logo-small">
      <img src="../../../assets/img/logo.png" />
     </div>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>La calificación que has otorgado es de <strong>{{currentRate}}</strong> estrellas</p>
      <label for="exampleFormControlTextarea1">Cuéntanos si quieres porque diste esta calificación</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-success" (click)="activeModal.close('Close click')">Enviar</button>
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Cerrar</button>
    </div>
  `,
  styleUrls: ['./rate.component.sass']
})
export class NgbdModalContent {
  @Input() currentRate = '';

  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.sass']
})
export class RateComponent implements OnInit {
  currentRate = 0;
  cartoonInfo: any;
  year: any;
  title: any;
  img: any;
  constructor(private modalService: NgbModal,
    public cartoonService : CartoonService) { }
  ngOnInit() {
    this.searchCartoon();
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.currentRate = this.currentRate;
  }

  random(){
    return Math.floor(Math.random() * (2382 - 1) + 1);
  }

  searchCartoon(){
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
