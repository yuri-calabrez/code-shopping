import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductNewModalComponent } from '../product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductInsertService } from './product-insert.service';
import { ProductEditService } from './product-edit.service';
import { ProductDeleteService } from './product-delete.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = []
  productId: number
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  @ViewChild(ProductNewModalComponent)
  poductNewModal: ProductNewModalComponent

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent

  constructor(
    private productHttpService: ProductHttpService,
    protected productInsertService: ProductInsertService,
    protected productEditService: ProductEditService,
    protected productDeleteService: ProductDeleteService
    ) { 
      this.productInsertService.productListComponent = this
      this.productEditService.productListComponent = this
      this.productDeleteService.productListComponent = this
    }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productHttpService.list({page: this.pagination.page})
      .subscribe(res => {
        this.products = res.data
        this.pagination.totalItems = res.meta.total
        this.pagination.itemsPerPage = res.meta.per_page
      })
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getProducts()
  }

}
