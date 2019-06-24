import { NgModule } from '@angular/core';
import { IsCurrentUserPipe } from './is-current-user/is-current-user';
import { BuildUrlPipe } from './build-url/build-url';
import { ColorFirstLetterPipe } from './color-first-letter/color-first-letter';
@NgModule({
	declarations: [IsCurrentUserPipe,
    BuildUrlPipe,
    ColorFirstLetterPipe],
	imports: [],
	exports: [IsCurrentUserPipe,
    BuildUrlPipe,
    ColorFirstLetterPipe]
})
export class PipesModule {}
