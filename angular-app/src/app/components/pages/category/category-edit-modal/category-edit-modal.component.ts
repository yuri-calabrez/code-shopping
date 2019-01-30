import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fieldsOptions from '../category-form/category-fields-options'

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  form: FormGroup
  errors = {}
  _categoryId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      active: true
    })
  }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value
    if (this._categoryId) {
      this.categoryHttp
      .get(this._categoryId)
      .subscribe(
        category => this.form.patchValue(category), 
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
    this.categoryHttp
    .update(this._categoryId, this.form.value)
    .subscribe(category => {
      this.onSuccess.emit(category)
      this.modal.hide()
    }, responseError => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors
      }
      this.onError.emit(responseError)
    })
  }

  showErrors(): boolean {
    return Object.keys(this.errors).length != 0
  }

}
