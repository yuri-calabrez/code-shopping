import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { Category } from 'src/app/models';
import { CategoryInsertService } from './category-insert.service';
import { CategoryEditService } from './category-edit.service';
import { CategoryDeleteService } from './category-delete.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = []
  categoryId: number
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: '', sort: ''}
  searchText: string

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent

  constructor(
    private categoryHttpService: CategoryHttpService,
    protected categoryInsertService: CategoryInsertService,
    protected categoryEditService: CategoryEditService,
    protected categoryDeleteService: CategoryDeleteService) { 
      this.categoryInsertService.categoryListComponent = this
      this.categoryEditService.categoryListComponent = this
      this.categoryDeleteService.categoryListComponent = this
    }

  ngOnInit() {
    this.getCategories()
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getCategories()
  }

  sort(sortColumn) {
    this.getCategories()
  }

  search(search) {
    this.searchText = search
    this.getCategories()
  }

  getCategories() {
    this.categoryHttpService.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(res => {
        this.categories = res.data
        this.pagination.totalItems = res.meta.total
        this.pagination.itemsPerPage = res.meta.per_page
      })
  }

}
