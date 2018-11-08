import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'app-category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  category: Category = {
    name: '',
    active: true
  }

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  submit() {
   this.categoryHttp
    .create(this.category)
    .subscribe(category => {
      this.onSuccess.emit(category)
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
