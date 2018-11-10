import { Injectable } from "@angular/core";
import { NotifyMessageService } from "src/app/services/notify-message.service";
import { ProductListComponent } from "./product-list.component";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService {

    private _productListComponent: ProductListComponent
    
    constructor(private notifyMessage: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value
    }

    showModalDelete(productId: number) {
        this._productListComponent.productId = productId
        this._productListComponent.productDeleteModal.showModal()
    }
    
    onDeleteSuccess($event: any) {
        this.notifyMessage.success(`Produto removido com sucesso!`)
        this._productListComponent.getProducts()
    }
    
    onDeleteError($event: HttpErrorResponse) {
       /*this.notifyMessage.error(`Não foi possível excluir a categoria. 
       Verifique se a mesma não esta relacionada com produtos.`)*/
    }
}