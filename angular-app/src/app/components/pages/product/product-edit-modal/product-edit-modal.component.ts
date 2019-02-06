import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  form: FormGroup
  errors = {}
  
  _productId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      active: true
    })
   }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value
    if (this._productId) {
      this.productHttp
      .get(this._productId)
      .subscribe(
        product => this.form.patchValue(product),
        responseError => {
          if (responseError.status == 401) {
            this.modal.hide()
          }
      })
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
    .update(this._productId, this.form.value)
    .subscribe(product => {
      this.onSuccess.emit(product)
      this.modal.hide()
    }, responseError => {
      if (responseError.status == 422) {
        this.errors = responseError.error.errors
      }
      this.onError.emit(responseError)
    })
  }

  showErrors(): boolean {
    return Object.keys(this.errors).length != 0
  }

}
