import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<any> = []
  categoryId: number

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories()
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

  showModalInsert() {
    this.categoryNewModal.showModal()
  }

  showModalEdit(categoryId: number) {
    this.categoryId = categoryId
    this.categoryEditModal.showModal()
  }

  showModalDelete(categoryId: number) {
    this.categoryId = categoryId
    this.categoryDeleteModal.showModal()
  }

  onInsertSuccess($event: any) {
    this.getCategories()
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event)
  }

  onEditSuccess($event: any) {
    this.getCategories()
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event)
  }

  onDeleteSuccess($event: any) {
    this.getCategories()
  }

  onDeleteError($event: HttpErrorResponse) {
    console.log($event)
  }

}
