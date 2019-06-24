import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { CustomerHttpProvider } from '../providers/http/customer-http';

import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessagesPageModule } from '../pages/chat-messages/chat-messages/chat-messages.module';

function jwtFactory(authService: AuthProvider) {
  return {
    whitelistedDomains: [
      new RegExp('localhost:8000/*')
    ],
    tokenGetter: () => {
      return authService.getToken()
    }
  }
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagesPageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider
  ]
})
export class AppModule {}
