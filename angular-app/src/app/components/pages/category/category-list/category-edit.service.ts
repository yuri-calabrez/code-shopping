import { Injectable } from "@angular/core";
import { NotifyMessageService } from "src/app/services/notify-message.service";
import { CategoryListComponent } from "./category-list.component";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService {

    private _categoryListComponent: CategoryListComponent
    
    constructor(private notifyMessage: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value
    }

    showModalEdit(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId
        this._categoryListComponent.categoryEditModal.showModal()
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Categoria editada com sucesso!')
        this._categoryListComponent.getCategories()
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event)
    }
}