import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-edit-modal',
  templateUrl: './chat-group-edit-modal.component.html',
  styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

  form: FormGroup
  errors = {}
  
  _chatGroupId: number
  photoUrl: string

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      photo: null
    })
   }

  ngOnInit() {
  }

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value
    if (this._chatGroupId) {
      this.chatGroupHttp
      .get(this._chatGroupId)
      .subscribe(
        chatGroup => {
          this.form.patchValue(chatGroup)
          this.photoUrl = chatGroup.photo_url
          },
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
    this.chatGroupHttp
    .update(this._chatGroupId, this.form.value)
    .subscribe(chatGroup => {
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

}
