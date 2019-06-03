import { Injectable } from "@angular/core";
import { NotifyMessageService } from "src/app/services/notify-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ChatGroupListComponent } from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupDeleteService {

    private _chatGroupListComponent: ChatGroupListComponent
    
    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupListComponent(value: ChatGroupListComponent) {
        this._chatGroupListComponent = value
    }

    showModalDelete(chatGroupId: number) {
        this._chatGroupListComponent.chatGroupId = chatGroupId
        this._chatGroupListComponent.chatGroupDeleteModal.showModal()
    }
    
    onDeleteSuccess($event: any) {
        this.notifyMessage.success(`Grupo removido com sucesso!`)
        this._chatGroupListComponent.getChatGroups()
    }
    
    onDeleteError($event: HttpErrorResponse) {
       /*this.notifyMessage.error(`Não foi possível excluir a categoria. 
       Verifique se a mesma não esta relacionada com produtos.`)*/
    }
}