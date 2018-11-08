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

  getCategories() {
    this.categoryHttpService.list()
      .subscribe(res => this.categories = res.data)
  }

}
