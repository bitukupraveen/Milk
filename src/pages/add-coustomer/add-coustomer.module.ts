import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCoustomerPage } from './add-coustomer';

@NgModule({
  declarations: [
    AddCoustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCoustomerPage),
  ],
})
export class AddCoustomerPageModule {}
