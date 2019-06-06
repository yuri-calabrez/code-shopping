import { Component } from '@angular/core';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';

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

  text: string;

  constructor(private firebaseAuth: FirebaseAuthProvider) {

  }

  ngOnInit(): void {
    const database = this.firebaseAuth.firebase.database()
    database.ref('chat_groups/1').on('value', (data) => {
      console.log(data.val())
    })
    
  }

}
