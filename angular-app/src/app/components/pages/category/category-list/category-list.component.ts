import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = []
  categoryId: number

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent

  constructor(private http: HttpClient, public categoryHttpService: CategoryHttpService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.categoryHttpService.list()
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
