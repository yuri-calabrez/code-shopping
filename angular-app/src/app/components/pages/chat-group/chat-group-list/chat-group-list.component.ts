import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroup } from 'src/app/models';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';
import { ChatGroupNewModalComponent } from '../chat-group-new-modal/chat-group-new-modal.component';
import { ChatGroupInsertService } from './chat-group-insert.service';
import { ChatGroupEditModalComponent } from '../chat-group-edit-modal/chat-group-edit-modal.component';
import { ChatGroupEditService } from './chat-group-edit.service';
import { ChatGroupDeleteModalComponent } from '../chat-group-delete-modal/chat-group-delete-modal.component';
import { ChatGroupDeleteService } from './chat-group-delete.service';

@Component({
  selector: 'chat-group-list',
  templateUrl: './chat-group-list.component.html',
  styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

  chatGroups: Array<ChatGroup> = []
  chatGroupId: number
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: '', sort: ''}
  searchText: string

  @ViewChild(ChatGroupNewModalComponent)
  chatGroupNewModal: ChatGroupNewModalComponent

  @ViewChild(ChatGroupEditModalComponent)
  chatGroupEditModal: ChatGroupEditModalComponent

  @ViewChild(ChatGroupDeleteModalComponent)
  chatGroupDeleteModal: ChatGroupDeleteModalComponent

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    protected chatGroupInsertService: ChatGroupInsertService,
    protected chatGroupEditService: ChatGroupEditService,
    protected chatGroupDeleteService: ChatGroupDeleteService
    ) { 
      this.chatGroupInsertService.chatGroupListComponent = this
      this.chatGroupEditService.chatGroupListComponent = this
      this.chatGroupDeleteService.chatGroupListComponent = this
    }

  ngOnInit() {
    this.getChatGroups()
  }

  getChatGroups() {
    this.chatGroupHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(res => {
        this.chatGroups = res.data
        this.pagination.totalItems = res.meta.total
        this.pagination.itemsPerPage = res.meta.per_page
      })
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getChatGroups()
  }

}
