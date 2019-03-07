import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-photo-delete-modal',
  templateUrl: './product-photo-delete-modal.component.html',
  styleUrls: ['./product-photo-delete-modal.component.css']
})
export class ProductPhotoDeleteModalComponent implements OnInit {

  errors = {}
  productId: number
  @Input()
  photoId: number

  @ViewChild(ModalComponent)
  modal: ModalComponent

  @Output() onSuccess:EventEmitter<any> = new EventEmitter<any>()
  @Output() onError:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product
    })
  }

 removePhoto() {
    this.productPhotoHttp
      .destroy(this.productId, this.photoId)
      .subscribe(() => {
        this.onSuccess.emit(true);
      },responseError => {
        if (responseError.status == 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      })
  }

  showErrors(): boolean {
    return Object.keys(this.errors).length != 0
  }

  showModal() {
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
  }

}
