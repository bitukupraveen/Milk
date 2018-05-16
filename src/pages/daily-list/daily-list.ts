import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Coustomer} from '../../models/coustomer/coustomer.interface';

import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

/**
 * Generated class for the DailyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-list',
  templateUrl: 'daily-list.html',
})
export class DailyListPage {
  coustomer = {} as Coustomer;
  coustomerRef$ : FirebaseObjectObservable<Coustomer>;
  dailyRef$ : FirebaseObjectObservable<Coustomer>;
  coustomerSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
  ) {

    const coustomerId = this.navParams.get('coustomerId');
    this.coustomerRef$ = this.database.object(`coustomers/${coustomerId}`);
    this.dailyRef$ = this.database.object('daily');
  

    this.coustomerSubscription = this.coustomerRef$.subscribe(coustomer => {
      this.coustomer = coustomer;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyListPage');
  }

}
