import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from 'src/app/common/validation-message';

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css'],
  host: {
    'class': 'invalid-feedback'
  }
})
export class FieldErrorComponent implements OnInit {

  @Input()
  field: FormControl

  constructor() { }

  ngOnInit() {
  }

  get errorKeys() {
    return Object.keys(this.errors)
  }
  get errors() {
    return this.field.errors
  }

  showError(): boolean {
    return this.field.invalid && (this.field.dirty || this.field.touched)
  }

  getMessage(error) {
    return ValidationMessage.getMessage(error, ['label'])
  }
}
