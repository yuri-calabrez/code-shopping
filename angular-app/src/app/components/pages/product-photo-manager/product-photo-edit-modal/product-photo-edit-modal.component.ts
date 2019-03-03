import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  selector: 'product-photo-edit-modal',
  templateUrl: './product-photo-edit-modal.component.html',
  styleUrls: ['./product-photo-edit-modal.component.css']
})
export class ProductPhotoEditModalComponent implements OnInit {

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

  editPhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.productPhotoHttp
      .update(this.productId, this.photoId, files[0])
      .subscribe(data => {
        this.onSuccess.emit(data)
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
