import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'app-category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

  category: Category = null
  _categoryId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value
    if (this._categoryId) {
      this.categoryHttp
      .get(this._categoryId)
      .subscribe(category => this.category = category)
    }
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

  destroy() {
    this.categoryHttp
      .destroy(this._categoryId)
      .subscribe(category => {
        this.onSuccess.emit(category)
        this.modal.hide()
      }, error => this.onError.emit(error))
  }

}
