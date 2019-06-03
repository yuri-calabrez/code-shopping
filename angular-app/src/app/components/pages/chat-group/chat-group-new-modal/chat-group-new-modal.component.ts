import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-new-modal',
  templateUrl: './chat-group-new-modal.component.html',
  styleUrls: ['./chat-group-new-modal.component.css']
})
export class ChatGroupNewModalComponent implements OnInit {

  form: FormGroup
  errors = {}

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      photo: [null, Validators.required]
    })
   }

  ngOnInit() {
  }

  submit() {
   this.chatGroupHttp
    .create(this.form.value)
    .subscribe(chatGroup => {
      this.form.reset({
        name: '',
        photo: null
      })
      this.onSuccess.emit(chatGroup)
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
