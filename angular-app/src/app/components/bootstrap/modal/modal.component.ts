import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

declare const $

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output()
  onHide: EventEmitter<Event> = new EventEmitter<Event>()

  constructor(private element: ElementRef) { }

  ngOnInit() {
    const jqueryElement = this.getJqueryElement()
    jqueryElement.find('[modal-title]').addClass('modal-title')
    jqueryElement.find('[modal-body]').addClass('modal-body')
    jqueryElement.find('[modal-footer]').addClass('modal-footer')

    jqueryElement.on('hidden.bs.modal', (e) => {
      this.onHide.emit(e)
    })
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
