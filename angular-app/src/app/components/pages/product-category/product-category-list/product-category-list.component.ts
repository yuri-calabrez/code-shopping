import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { Product, ProductCategory, Category } from 'src/app/models';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number
  product: Product = null
  productCategory: ProductCategory = null
  categories: Category[] = []
  categoriesId: number[] = []

  constructor(
    private route: ActivatedRoute, 
    private productHttp: ProductHttpService,
    private productCategoryHttp: ProductCategoryHttpService,
    private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
    this.getCategories()
    this.route.params.subscribe(params => {
      this.productId = params.product
      this.getProduct()
      this.getProductCategory()
    })
  }

  getProduct() {
    this.productHttp
      .get(this.productId)
      .subscribe(product => this.product = product)
  }

  getCategories() {
    this.categoryHttp.list(1)
      .subscribe(res => {
        this.categories = res.data
      })
  }

  getProductCategory() {
    this.productCategoryHttp
      .list(this.productId)
      .subscribe(productCategory => this.productCategory = productCategory)
  }

  submit() {
    this.productCategoryHttp
      .create(this.productId, this.mergeCategories())
      .subscribe(productCategories => this.getProductCategory())

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
