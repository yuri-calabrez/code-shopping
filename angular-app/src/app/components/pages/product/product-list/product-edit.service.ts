import { Injectable } from "@angular/core";
import { NotifyMessageService } from "src/app/services/notify-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductListComponent } from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductEditService {

    private _productListComponent: ProductListComponent
    
    constructor(private notifyMessage: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value
    }

    showModalEdit(productId: number) {
        this._productListComponent.productId = productId
        this._productListComponent.productEditModal.showModal()
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Produto editado com sucesso!')
        this._productListComponent.getProducts()
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event)
    }
}