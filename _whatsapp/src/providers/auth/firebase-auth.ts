import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import firebaseConfig from '../../app/fb-config'
import scriptjs from 'scriptjs'
declare const firebaseui
(<any>window).firebase = firebase

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor() {
    firebase.initializeApp(firebaseConfig)
  }

  async makePhoneNumberForm(selectorElement: string) {
    const firebaseui = await this.getFirebaseUI()
    const uiConfig = {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return false
        }
      }
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start(selectorElement, uiConfig)
  }

  private async getFirebaseUI(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.hasOwnProperty('firebaseui')) {
        resolve(firebaseui)
        return
      }

      scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui)
      })
    })
  }

}
