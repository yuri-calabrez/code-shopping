import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import productInputFieldsOptions from './product-input-fields-options';
import { ProductIdFieldService } from './poduct-id-field.service';
import { Select2Component } from 'ng2-select2';

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element:ElementRef

  constructor(private changeRef: ChangeDetectorRef, public productIdField: ProductIdFieldService) { }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'))
  }

  ngOnChanges() {
    this.changeRef.detectChanges()
  }

  get fieldsOptions(): any {
    return productInputFieldsOptions
  }

}
