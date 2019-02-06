import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  selector: 'app-product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  form: FormGroup
  errors = {}

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

  submit() {
   this.productHttp
    .create(this.form.value)
    .subscribe(product => {
      this.form.reset({
        name: '',
        description: '',
        price: '',
        active: true
      })
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

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

}
