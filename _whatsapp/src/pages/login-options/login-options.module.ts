import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOptionsPage } from './login-options';

@NgModule({
  declarations: [
    LoginOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOptionsPage),
  ],
})
export class LoginOptionsPageModule {}
