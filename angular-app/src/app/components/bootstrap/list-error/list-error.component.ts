import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-error',
  templateUrl: './list-error.component.html',
  styleUrls: ['./list-error.component.css']
})
export class ListErrorComponent implements OnInit {

  @Input()
  errors = {}

  constructor() { }

  ngOnInit() {
  }

  get errorsKeys() {
    return Object.keys(this.errors)
  }

}
