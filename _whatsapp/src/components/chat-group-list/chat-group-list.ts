import { Component } from '@angular/core';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { ChatGroup } from '../../app/model';

/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = []

  constructor(private firebaseAuth: FirebaseAuthProvider) {

  }

  ngOnInit(): void {
    const database = this.firebaseAuth.firebase.database()
    database.ref('chat_groups').on('child_added', (data) => {
      const group = data.val() as ChatGroup
      this.groups.push(group)
    })

    database.ref('chat_groups').on('child_changed', (data) => {
      const group = data.val() as ChatGroup
      const index = this.groups.findIndex(g => g.id == group.id)

      if (index !== -1) {
        this.groups[index] = group
      }
    })
    
  }

}
