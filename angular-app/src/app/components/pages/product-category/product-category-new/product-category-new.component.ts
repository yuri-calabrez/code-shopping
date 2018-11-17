import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Category, ProductCategory } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

  categories: Category[] = []
  categoriesId: number[] = []

  @Input() productId: number
  @Input() productCategory: ProductCategory = null

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private categoryHttp: CategoryHttpService, private productCategoryHttp: ProductCategoryHttpService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.categoryHttp.list({all: '1'})
      .subscribe(res => {
        this.categories = res.data
      })
  }

  submit() {
    this.productCategoryHttp
      .create(this.productId, this.mergeCategories())
      .subscribe(
        productCategories => this.onSuccess.emit(productCategories),
        error => this.onError.emit(error)
      )

    return false
  }

  /**
   * Remove duplicates
   */
  private mergeCategories(): number[] {
    const categoriesId = this.productCategory.categories.map(category => category.id)
    const newCategories = this.categoriesId.filter(category => {
      return categoriesId.indexOf(category) == -1
    })

    return categoriesId.concat(newCategories)
  }

}
