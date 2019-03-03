import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPhoto, Product } from 'src/app/models';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductPhotoEditModalComponent } from './product-photo-edit-modal/product-photo-edit-modal.component';

declare const $

@Component({
  selector: 'product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = []
  product:Product = null
  productId: number
  photoIdToEdit: number

  @ViewChild(ProductPhotoEditModalComponent)
  editModal: ProductPhotoEditModalComponent

  constructor(
    private poductPhotoHttp: ProductPhotoHttpService, 
    private route: ActivatedRoute,
    private notifyMessage: NotifyMessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product
      this.getPhotos()
    })
    this.configFancybox()
  }

  getPhotos() {
    this.poductPhotoHttp
      .list(this.productId)
      .subscribe(data => {
        this.photos = data.photos
        this.product = data.product
      })
  }

  onInsertSucccess(data: {photos: ProductPhoto[]}) {
    this.photos.push(...data.photos)
    this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso!');
  }

  onEditSuccess(data: ProductPhoto) {
    $.fancybox.getInstance().close()
    this.editModal.closeModal()
    const index = this.photos.findIndex((photo: ProductPhoto) => {
      return photo.id == this.photoIdToEdit
    })

    this.photos[index] = data
    this.notifyMessage.success('Foto substituída com sucesso!');
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
    <a href="javascript:void(0)" class="fancybox-button" data-fancybox-edit title="Substituir" style="text-align: center;">
      <i class="fas fa-edit"></i>
    </a>`

    $.fancybox.defaults.buttons = ['download', 'edit']
    $('body').on('click', '[data-fancybox-edit]', (e) => {
      const photoId = this.getPhotoIdFromSlideShow()
      this.photoIdToEdit = photoId
      this.editModal.showModal()
    })
  }

  getPhotoIdFromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src')
    const id = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id')
    return id.split('-')[1]
  }

}
