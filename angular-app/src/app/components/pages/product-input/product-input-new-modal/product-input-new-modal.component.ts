import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInputHttpService } from 'src/app/services/http/product-input-http.service';
import productInputFieldsOptions from '../product-input-form/product-input-fields-options';

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {

  form: FormGroup
  errors = {}
  
  @ViewChild(ModalComponent) modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private productInputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product_id: [null, [Validators.required]],
      amount: ['', [Validators.required, Validators.min(productInputFieldsOptions.amount.validationMessage.min)]],
    })
   }

  ngOnInit() {
  }

  submit() {
   this.productInputHttp
    .create(this.form.value)
    .subscribe(productInput => {
      this.form.reset({
        product_id: '',
        amount: ''
      })
      this.onSuccess.emit(productInput)
      this.modal.hide()
    }, responseError => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors
      }
      this.onError.emit(responseError)
    })
  }

  showModal() {
    console.log(this.modal)
    this.modal.show()
  }

  showErrors(): boolean {
    return Object.keys(this.errors).length != 0
  }

  hideModal($event: Event) {
    console.log($event)
  }

}
