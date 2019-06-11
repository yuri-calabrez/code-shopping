import { Component, OnInit } from '@angular/core';
import { ChatGroup, User } from 'src/app/models';
import { ChatGroupUserHttpService } from 'src/app/services/http/chat-group-user-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat-group-user-list',
  templateUrl: './chat-group-user-list.component.html',
  styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatgroupUserListComponent implements OnInit {

  chatGroupId: number
  chatGroup: ChatGroup
  users: Array<User> = []
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  }

  constructor(private chatGroupUserHttp: ChatGroupUserHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatGroupId = params.chat_group
      this.getUsers()
    })
  }

  getUsers() {
    this.chatGroupUserHttp
      .list(this.chatGroupId, {page: this.pagination.page})
      .subscribe(response => {
        this.chatGroup = response.data.chat_group
        this.users = response.data.users
        this.pagination.totalItems = response.meta.total
        this.pagination.itemsPerPage = response.meta.per_page
      })
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getUsers()
  }

}
