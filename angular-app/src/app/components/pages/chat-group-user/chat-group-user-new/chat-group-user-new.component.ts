import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ChatGroupUserHttpService } from 'src/app/services/http/chat-group-user-http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Select2Component } from 'ng2-select2';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare const $

@Component({
  selector: 'chat-group-user-new',
  templateUrl: './chat-group-user-new.component.html',
  styleUrls: ['./chat-group-user-new.component.css']
})
export class ChatGroupUserNewComponent implements OnInit {

  @Input()
  chatGroupId: number
  usersId: number[]
  select2Options = {
    data: null,
    options: {}
  }

  constructor(private chatGroupUserHttp: ChatGroupUserHttpService, private authService: AuthService) { }

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  ngOnInit() {
    this.prepareSelect2()
  }

  prepareSelect2(){
    this.select2Options.options = {
      minimumInputLength: 1,
      theme: 'bootstrap4',
      multiple: true,
      ajax: {
        headers: {
          'Authorization': this.authService.authorizationHeader
        },
        url: `${environment.api.url}/users?role=customer`,
        data(params) {
          return {
            search: params.term
          }
        },
        processResults(data) {
          return {
            results: data.data.map(user => {
              return {id: user.id, text: user.name}
            })
          }
        }
      }
    }

    this.select2Options.data = []
  }

  submit() {
    this.chatGroupUserHttp
      .create(this.chatGroupId, this.usersId)
      .subscribe(response => {
        this.resetSelect2()
        this.onSuccess.emit(response)
      },
      error => this.onError.emit(error))
  }

  private resetSelect2() {
    const selectField = $(this.select2Native).find('select')
    selectField.val(null).trigger('change')
    this.usersId = []
  }

  get select2Native(): HTMLElement {
    return this.select2Element.nativeElement
  }

}
