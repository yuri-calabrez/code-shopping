import { Pipe, PipeTransform } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the IsCurrentUserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'isCurrentUser',
})
export class IsCurrentUserPipe implements PipeTransform {

  constructor(private auth: AuthProvider) {}
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return this.auth.me.profile.firebase_uid === value
  }
}
