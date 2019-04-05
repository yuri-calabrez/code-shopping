import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
//import * as firebaseui from 'firebaseui'
import firebaseConfig from '../../app/fb-config'
import scriptjs from 'scriptjs'
declare const firebaseui
(<any>window).firebase = firebase

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
      firebase.initializeApp(firebaseConfig)
      const uiConfig = {
        signInOptions: [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
      }

      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebase-ui', uiConfig)
    })
  }

}
