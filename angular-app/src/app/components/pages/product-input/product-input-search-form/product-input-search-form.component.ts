import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-input-search-form',
  templateUrl: './product-input-search-form.component.html',
  styleUrls: ['./product-input-search-form.component.css']
})
export class ProductInputSearchFormComponent implements OnInit {

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>()

  search: string = '';

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search)
    return false
  }

}
