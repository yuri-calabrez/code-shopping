import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[sortColumn]',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

  @Input()
  sortColumn: {column: string, sort: string}

  @Input()
  columnName: string

  @Output()
  onSort: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  changeSort() {
    this.sortColumn.column = this.columnName
    this.sortColumn.sort = this.sortColumn.sort === 'desc' ? 'asc' : 'desc'
    this.onSort.emit(this.sortColumn)
  }

  showArrowDown(): boolean {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'desc'
  }

  showArrowUp(): boolean {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'asc'
  }

}
