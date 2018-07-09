import { NgModule } from '@angular/core';
import { GreatPipe } from './great/great';
@NgModule({
	declarations: [GreatPipe],
	imports: [],
	exports: [GreatPipe]
})
export class PipesModule {}
