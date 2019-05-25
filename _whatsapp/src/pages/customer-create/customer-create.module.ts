import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCreatePage } from './customer-create';

@NgModule({
  declarations: [
    CustomerCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCreatePage),
  ],
})
export class CustomerCreatePageModule {}
