import { Component } from '@angular/core';

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

  text: string;

  constructor() {
    console.log('Hello ChatFooterComponent Component');
    this.text = 'Hello World';
  }

}
