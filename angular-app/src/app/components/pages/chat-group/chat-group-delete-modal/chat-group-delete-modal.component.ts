import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ChatGroup } from 'src/app/models';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';

@Component({
  selector: 'chat-group-delete-modal',
  templateUrl: './chat-group-delete-modal.component.html',
  styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {

  chatGroup: ChatGroup = null
  _chatGroup: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private chatGroupHttp: ChatGroupHttpService) { }

  ngOnInit() {
  }

  @Input()
  set chatGroupId(value) {
    this._chatGroup = value
    if (this._chatGroup) {
      this.chatGroupHttp
      .get(this._chatGroup)
      .subscribe(chatGroup => this.chatGroup = chatGroup)
    }
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
  }

  destroy() {
    this.chatGroupHttp
      .destroy(this._chatGroup)
      .subscribe(chatGroup => {
        this.onSuccess.emit(chatGroup)
        this.modal.hide()
      }, error => this.onError.emit(error))
  }

}
