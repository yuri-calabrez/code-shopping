import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../main/main';
import { CustomerCreatePage } from '../customer-create/customer-create';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private firebaseAuth: FirebaseAuthProvider, 
    private authService: AuthProvider) 
    {

    }

  ionViewDidLoad() {
    const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuthUser()
        unsubscribed();
      }
    })
    
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui')
  }

  handleAuthUser() {
    this.authService
        .login()
        .subscribe(token => {
          this.redirectToMainPage()
        }, error => {
          this.firebaseAuth
            .makePhoneNumberForm('#firebase-ui')
            .then(() => this.handleAuthUser())
          this.redirectToCustomerCreatePage()
        })
  }

  redirectToMainPage(){
    this.navCtrl.setRoot(MainPage)
  }

  redirectToCustomerCreatePage(){
    this.navCtrl.push(CustomerCreatePage)
  }

}
