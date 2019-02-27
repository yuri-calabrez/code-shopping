import { Component, OnInit } from '@angular/core';
import { ProductPhoto, Product } from 'src/app/models';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = []
  product:Product = null
  productId: number

  constructor(private poductPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product
      this.getPhotos()
    })
  }

  getPhotos() {
    this.poductPhotoHttp
      .list(this.productId)
      .subscribe(data => {
        this.photos = data.photos
        this.product = data.product
      })
  }



}
