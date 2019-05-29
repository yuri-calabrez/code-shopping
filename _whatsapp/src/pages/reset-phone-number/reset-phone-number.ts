import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the ResetPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-phone-number',
  templateUrl: 'reset-phone-number.html',
})
export class ResetPhoneNumberPage {

  email = new FormControl('', [Validators.required, Validators.email])
  canShowFirebaseUi: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseAuth: FirebaseAuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPhoneNumberPage');
  }

  showFirebaseUi() {
    this.canShowFirebaseUi = true
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui')
  }

}
