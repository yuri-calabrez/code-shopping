import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseAuth: FirebaseAuthProvider) {
  }

  ionViewDidLoad() {
   this.firebaseAuth.getToken().then(token => console.log(token), error => console.log(error))
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui')
  }

}
