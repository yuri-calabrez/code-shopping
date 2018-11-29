import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  user: User = {
    name: '',
    email: ''
  }

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  submit() {
   this.userHttp
    .create(this.user)
    .subscribe(user => {
      this.onSuccess.emit(user)
      this.modal.hide()
    }, error => this.onError.emit(error))
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

}
