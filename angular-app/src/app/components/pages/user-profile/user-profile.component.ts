import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserProfileHttpService } from 'src/app/services/http/user-profile-http.service';
import { AuthService } from 'src/app/services/auth.service';
import { PhoneNumberAuthModalComponent } from '../../common/phone-number-auth-modal/phone-number-auth-modal.component';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import fieldsOptions from './user-profile-fields-options';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup
  errors = {}
  has_photo: boolean

  @ViewChild(PhoneNumberAuthModalComponent)
  phoneNumberAuthModalComponent: PhoneNumberAuthModalComponent

  constructor(
    private formBuilder: FormBuilder, 
    private notifyMessage: NotifyMessageService,
    private userProfileHttp: UserProfileHttpService,
    private authService: AuthService,
    private firebaseAuth: FirebaseAuthService
    ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(16)]],
      phone_number: null,
      token: null,
      photo: false
    })
    this.form.patchValue(this.authService.me)
    this.form.get('phone_number').setValue(this.authService.me.profile.phone_number)
    this.setHasPhoto()
  }

  ngOnInit() {
  }

  get fieldsOptions(): any {
    return fieldsOptions
  }

  submit() {
    const data = Object.assign({}, this.form.value)
    delete data.phone_number

    this.userProfileHttp
      .update(data)
      .subscribe(data => {
        this.form.get('photo').setValue(false)
        this.form.get('token').setValue(null)
        this.setHasPhoto()
        this.notifyMessage.success('Perfil atualizado com sucesso!')
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
      })
      return false;
  }

  setHasPhoto() {
    this.has_photo = this.authService.me.profile.has_photo
  }

  onChoosePhoto(files: FileList) {
    if (!files.length) {
      return
    }

    this.form.get('photo').setValue(files[0])
  }

  removePhoto() {
    this.form.get('photo').setValue(null)
    this.has_photo = false
  }

  showErrors(){
    return Object.keys(this.errors).length != 0
  }

  openPhoneNumberAuthModal() {
    this.phoneNumberAuthModalComponent.showModal()
  }

  onPhoneNumberVerification(event) {
    this.firebaseAuth.getUser().then(user => this.form.get('phone_number').setValue(user.phoneNumber));
    this.firebaseAuth.getToken().then(token => this.form.get('token').setValue(token))
  }

}
