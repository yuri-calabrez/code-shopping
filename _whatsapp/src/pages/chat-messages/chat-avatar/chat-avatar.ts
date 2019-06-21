import { Component } from '@angular/core';

/**
 * Generated class for the ChatAvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-avatar',
  templateUrl: 'chat-avatar.html'
})
export class ChatAvatarComponent {

  text: string;

  constructor() {
    console.log('Hello ChatAvatarComponent Component');
    this.text = 'Hello World';
  }

}
