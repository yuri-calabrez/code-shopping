import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  category: Object = {
    name: '',
    active: true
  }
  
  _categoryId: number

  @ViewChild(ModalComponent)  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value
    if (this._categoryId) {
      const token = window.localStorage.getItem('token')
      this.http.get<{data: any}>(`http://localhost:8000/api/categories/${value}`,  {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .subscribe(response => this.category = response.data)
    }
  }

  showModal() {
    this.modal.show()
  }

  hideModal($event: Event) {
    console.log($event)
  }

  submit() {
    const token = window.localStorage.getItem('token')
    this.http.put(`http://localhost:8000/api/categories/${this._categoryId}`, this.category,  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .subscribe(category => {
      this.onSuccess.emit(category)
      this.modal.hide()
    }, error => this.onError.emit(error))
  }

}
