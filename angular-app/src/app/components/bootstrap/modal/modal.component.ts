import { Component, OnInit, ElementRef } from '@angular/core';

declare const $

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  show() {
    this.getJqueryElement().modal('show')
  }

  hide() {
    this.getJqueryElement().modal('hide')
  }

  private getJqueryElement() {
    const nativeElement = this.element.nativeElement
    return $(nativeElement.firstChild)
  }

}
