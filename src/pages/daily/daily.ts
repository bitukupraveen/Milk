import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Daily} from '../../models/daily/daily.interface';
import {Coustomer} from '../../models/coustomer/coustomer.interface';
import {Subscription} from 'rxjs/Subscription';

/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html',
})
export class DailyPage {
  coustomer = {} as Coustomer;
  dailyRef$: FirebaseListObservable<Daily[]>;
  coustomerSubscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
              ) {
    this.dailyRef$ = this.database.list('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyPage');
  }

}
