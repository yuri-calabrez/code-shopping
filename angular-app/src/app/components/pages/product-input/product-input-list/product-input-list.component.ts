import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInputHttpService } from 'src/app/services/http/product-input-http.service';
import { ProductInput } from 'src/app/models';
import { ProductInputNewModalComponent } from '../product-input-new-modal/product-input-new-modal.component';
import { ProductInputInsertService } from './product-input-insert.service';

@Component({
  selector: 'app-product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  inputs: Array<ProductInput> = []
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: '', sort: ''}
  searchText: string

  @ViewChild(ProductInputNewModalComponent)
  productInputNewModal: ProductInputNewModalComponent

  constructor(
    private productInputHttpService: ProductInputHttpService,
    protected productInputInsertService: ProductInputInsertService
    ) { 
      this.productInputInsertService.productInputListComponent = this
    }

  ngOnInit() {
    this.getInputs()
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getInputs()
  }

  sort(sortColumn) {
    this.getInputs()
  }

  getInputs() {
    this.productInputHttpService.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(res => {
        this.inputs = res.data
        this.pagination.totalItems = res.meta.total
        this.pagination.itemsPerPage = res.meta.per_page
      })
  }

}
