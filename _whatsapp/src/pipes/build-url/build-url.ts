import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BuildUrlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'buildUrl',
})
export class BuildUrlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
   return value.startsWith('http') ? value : `http://localhost:8000/storage/${value}`
  }
}
