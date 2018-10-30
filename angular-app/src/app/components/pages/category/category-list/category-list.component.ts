import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

declare let $

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<any> = []

  category: Object = {
    name: ''
  }

  @ViewChild(ModalComponent)
  modal: ModalComponent

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories()
  }

  submit() {
    const token = window.localStorage.getItem('token')
    this.http.post('http://localhost:8000/api/categories', this.category,  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .subscribe(category => {
      $("#exampleModal").modal('hide')
      this.getCategories()
    })
  }

  getCategories() {
    const token = window.localStorage.getItem('token')
    this.http.get<{data: Array<any>}>('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .subscribe(res => this.categories = res.data)
  }

  showModal() {
    this.modal.show()
  }

}
