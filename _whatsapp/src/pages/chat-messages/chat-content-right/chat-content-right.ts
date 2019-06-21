import { Component } from '@angular/core';

/**
 * Generated class for the ChatContentRightComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-right',
  templateUrl: 'chat-content-right.html'
})
export class ChatContentRightComponent {

  text: string;

  constructor() {
    console.log('Hello ChatContentRightComponent Component');
    this.text = 'Hello World';
  }

}
