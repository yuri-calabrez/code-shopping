import { Injectable } from "@angular/core";
import { NotifyMessageService } from "src/app/services/notify-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UserListComponent } from "./user-list.component";

@Injectable({
    providedIn: 'root'
})
export class UserDeleteService {

    private _userListComponent: UserListComponent
    
    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value
    }

    showModalDelete(userId: number) {
        this._userListComponent.userId = userId
        this._userListComponent.userDeleteModal.showModal()
    }
    
    onDeleteSuccess($event: any) {
        this.notifyMessage.success(`Usuário removido com sucesso!`)
        this._userListComponent.getUsers()
    }
    
    onDeleteError($event: HttpErrorResponse) {
        console.log($event)
    }
}