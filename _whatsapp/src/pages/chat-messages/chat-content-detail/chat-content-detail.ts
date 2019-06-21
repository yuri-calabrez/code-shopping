import { Component } from '@angular/core';

/**
 * Generated class for the ChatContentDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-detail',
  templateUrl: 'chat-content-detail.html'
})
export class ChatContentDetailComponent {

  text: string;

  constructor() {
    console.log('Hello ChatContentDetailComponent Component');
    this.text = 'Hello World';
  }

}
