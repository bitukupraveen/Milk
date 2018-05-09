import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Coustomer} from '../../models/coustomer/coustomer.interface';
import {Daily} from '../../models/daily/daily.interface';
import {Item} from '../../models/item/item.interface';
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
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
  daily = { } as Daily;

  coustomerRef$ : FirebaseObjectObservable<Coustomer>;
  dailyRef$ : FirebaseListObservable<Daily[]>;
  itemsRef$: FirebaseListObservable<Item[]>;

   coustomerSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
  ) {
    const coustomerId = this.navParams.get('coustomerId');
    this.coustomerRef$ = this.database.object(`coustomers/${coustomerId}`);

    this.coustomerSubscription = this.coustomerRef$.subscribe(coustomer => {
      this.coustomer = coustomer;
    })
    this.dailyRef$ = this.database.list('daily');
    this.itemsRef$ = this.database.list('items');
    
  }
  
  myDate: String = new Date().toISOString();


  saveDaily(daily: Daily) {
    console.log(daily);


    const promise =  this.dailyRef$.push({
      itemName: daily.itemName,
      itemVariant: daily.itemVariant,
      itemPrice: Number(daily.itemPrice),
      itemQuantity: Number(daily.itemQuantity),
      coustomerId: daily.coustomerId
      
    });
    promise
        .then(_ => {
            console.log('Added Item');
            this.daily = {} as Daily;
            this.navCtrl.pop();
        } )
        .catch(err => console.log(err, 'Error Adding Coustomer'));



}
ionViewDidLoad() {
  this.coustomerSubscription.unsubscribe();
}
}
