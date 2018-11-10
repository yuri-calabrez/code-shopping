import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/models';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  }
  
  _productId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value
    if (this._productId) {
      this.productHttp
      .get(this._productId)
      .subscribe(product => this.product = product)
    }
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

  submit() {
    this.productHttp
    .update(this._productId, this.product)
    .subscribe(product => {
      this.onSuccess.emit(product)
      this.modal.hide()
    }, error => this.onError.emit(error))
  }

}
