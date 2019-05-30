import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { FormControl, Validators } from '@angular/forms';
import { CustomerHttpProvider } from '../../providers/http/customer-http';
import { LoginOptionsPage } from '../login-options/login-options';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private firebaseAuth: FirebaseAuthProvider,
    private customerHttp: CustomerHttpProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPhoneNumberPage');
  }

  showFirebaseUi() {
    this.canShowFirebaseUi = true
    this.handleUpdate()
  }

  handleUpdate() {
    this.firebaseAuth
      .makePhoneNumberForm('#firebase-ui')
      .then(() => {
        const email = this.email.value
        this.customerHttp
          .requestUpdatePhoneNumber(email)
          .subscribe(() => {
            this.showSuccessMessage()
          }, () => {
            this.showErrorMessage()
          })
      })
  }

  showSuccessMessage() {
    const alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Um e-mail com a validação da mudança foi enviado. Valide-o para logar com o novo telefone',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(LoginOptionsPage);
          }
        }
      ]
    })
    alert.present()
  }

  showErrorMessage() {
    const toast = this.toastCtrl.create({
      message: 'Não foi possível atualizar o telefone.',
      duration: 3000
    })
    toast.present()
    this.handleUpdate()
  }

}
