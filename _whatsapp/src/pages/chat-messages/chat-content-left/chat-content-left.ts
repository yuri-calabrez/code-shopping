import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../../app/model';

/**
 * Generated class for the ChatContentLeftComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-left',
  templateUrl: 'chat-content-left.html'
})
export class ChatContentLeftComponent {

  @Input()
  message: ChatMessage

  constructor() {
    
  }

}
