import { Injectable } from '@angular/core';
import { ProductInputListComponent } from './product-input-list.component';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductInputInsertService {

  private _productInputComponent: ProductInputListComponent
    
  constructor(private notifyMessage: NotifyMessageService) { }

  set productInputListComponent(value: ProductInputListComponent) {
      this._productInputComponent = value
  }

  showModalInsert() {
      this._productInputComponent.productInputNewModal.showModal()
  }

  onInsertSuccess($event: any) {
      this.notifyMessage.success('Entrada de estoque cadastrada com sucesso!')
      this._productInputComponent.getInputs()
  }

  onInsertError($event: HttpErrorResponse) {
      console.log($event)
  }
}
