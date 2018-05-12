import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyListPage } from './daily-list';

@NgModule({
  declarations: [
    DailyListPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyListPage),
  ],
})
export class DailyListPageModule {}
