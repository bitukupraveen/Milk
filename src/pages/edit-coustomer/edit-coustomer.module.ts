import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCoustomerPage } from './edit-coustomer';

@NgModule({
  declarations: [
    EditCoustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCoustomerPage),
  ],
})
export class EditCoustomerPageModule {}
