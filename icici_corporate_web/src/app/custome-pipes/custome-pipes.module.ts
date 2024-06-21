import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplaceUnderscorePipe } from './replace-underscore-pipe';

@NgModule({
  declarations: [ReplaceUnderscorePipe],
  imports: [
    CommonModule
  ],
  exports:[ReplaceUnderscorePipe]
})
export class CustomePipesModule { }
