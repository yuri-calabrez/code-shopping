import { NgModule } from '@angular/core';
import { IsCurrentUserPipe } from './is-current-user/is-current-user';
@NgModule({
	declarations: [IsCurrentUserPipe],
	imports: [],
	exports: [IsCurrentUserPipe]
})
export class PipesModule {}
