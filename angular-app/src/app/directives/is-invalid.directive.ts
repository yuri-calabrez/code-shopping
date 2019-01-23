import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[isInvalid]'
})
export class IsInvalidDirective {

  constructor(private element: ElementRef ,private control: NgControl) { }

  ngOnInit() {
    this.control.valueChanges.subscribe(() => {
      const nativeElement: HTMLElement = this.element.nativeElement
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        if (!nativeElement.classList.contains('is-invalid')) {
          nativeElement.classList.add('is-invalid')
        }
      } else {
        nativeElement.classList.remove('is-invalid')
      }
    })
  }

}
