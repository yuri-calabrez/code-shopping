import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPhoneNumberPage } from './login-phone-number';

@NgModule({
  declarations: [
    LoginPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPhoneNumberPage),
  ],
})
export class LoginPhoneNumberPageModule {}
