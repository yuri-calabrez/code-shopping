import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ColorFirstLetterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'colorFirstLetter',
})
export class ColorFirstLetterPipe implements PipeTransform {

  mapColors = {
    'a': '#4286f4',
    'b': '#80f442',
    'c': '#f48042',
    'd': '#f442df',
    'e': '#42dff4'
  }

  defaultColor = '#000000'
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (!value || value === '') {
      return this.defaultColor
    }
    
    const letterLowerCase = value.substring(0, 1).toLowerCase()
    return this.mapColors.hasOwnProperty(letterLowerCase) ? this.mapColors[letterLowerCase] : this.defaultColor;
  }
}
