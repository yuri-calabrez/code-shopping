import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { UserNewModalComponent } from '../user-new-modal/user-new-modal.component';
import { UserInsertService } from './user-insert.service';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { UserEditService } from './user-edit.service';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';
import { UserDeleteService } from './user-delete.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = []
  userId: number
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  @ViewChild(UserNewModalComponent)
  userNewModal: UserNewModalComponent

  @ViewChild(UserEditModalComponent)
  userEditModal: UserEditModalComponent

  @ViewChild(UserDeleteModalComponent)
  userDeleteModal: UserDeleteModalComponent

  constructor(
    private userHttpService: UserHttpService,
    protected userInsertService: UserInsertService,
    protected userEditService: UserEditService,
    protected userDeleteService: UserDeleteService
    ) { 
      this.userInsertService.userListComponent = this
      this.userEditService.userListComponent = this
      this.userDeleteService.userListComponent = this
    }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userHttpService.list({page: this.pagination.page})
      .subscribe(res => {
        this.users = res.data
        this.pagination.totalItems = res.meta.total
        this.pagination.itemsPerPage = res.meta.per_page
      })
  }

  pageChanged(page: number) {
    this.pagination.page = page
    this.getUsers()
  }

}
