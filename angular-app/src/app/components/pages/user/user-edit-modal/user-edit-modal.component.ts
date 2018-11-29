import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  user: User = {
    name: '',
    email: ''
  }
  
  _userId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  @Input()
  set userId(value) {
    this._userId = value
    if (this._userId) {
      this.userHttp
      .get(this._userId)
      .subscribe(user => this.user = user)
    }
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

  submit() {
    this.userHttp
    .update(this._userId, this.user)
    .subscribe(user => {
      this.onSuccess.emit(user)
      this.modal.hide()
    }, error => this.onError.emit(error))
  }

}
