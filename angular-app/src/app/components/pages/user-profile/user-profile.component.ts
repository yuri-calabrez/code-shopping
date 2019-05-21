import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserProfileHttpService } from 'src/app/services/http/user-profile-http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup
  errors = {}
  has_photo: boolean

  constructor(
    private formBuilder: FormBuilder, 
    private notifyMessage: NotifyMessageService,
    private userProfileHttp: UserProfileHttpService,
    private authService: AuthService
    ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(16)]],
      phone_number: null,
      photo: false
    })
    this.form.patchValue(this.authService.me)
    this.form.get('phone_number').setValue(this.authService.me.profile.phone_number)
    this.setHasPhoto()
  }

  ngOnInit() {
  }

  submit() {
    const data = Object.assign({}, this.form.value)
    delete data.phone_number

    this.userProfileHttp
      .update(data)
      .subscribe(data => {
        this.form.get('photo').setValue(false)
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

}
