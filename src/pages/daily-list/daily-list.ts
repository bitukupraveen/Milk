import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Coustomer } from '../../models/coustomer/coustomer.interface';
import { Daily } from '../../models/daily/daily.interface';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';


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
  coustomerRef$: FirebaseObjectObservable<Coustomer>;
  dailyRef$: FirebaseListObservable<Daily[]>;
  coustomerSubscription: Subscription;
  // public months: any = [];
  public filteredData: any = [];
  public daywise: any = [];
  public items: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {




    const coustomerId = this.navParams.get('coustomerId');
    this.coustomerRef$ = this.database.object(`coustomers/${coustomerId}`);
    this.dailyRef$ = this.database.list('daily/' + `${coustomerId}`);
    this.items = this.dailyRef$;


    this.coustomerSubscription = this.coustomerRef$.subscribe(coustomer => {
      this.coustomer = coustomer;
    })
    // this.months = [
    //   { 'Date': '2018-5-21' },
    //   { 'Date': '2018-5-22' },
    //   { 'Date': '2018-5-23' },
    //   { 'Date': '2018-5-24' },
    //   { 'Date': '2018-5-25' }
    // ]



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyListPage');
    this
      .items
      .forEach(item => {

        item.forEach(x => {

         this.daywise.push(x.todayDate);
        })
      })
       let map = new Map();
       for (var element of this.daywise) {
         map.set(element, element);
       }
       
       
       map.forEach( (value, key, map) => {
         this.filteredData.push(value);
       });
       
       // Print filtered data
       console.log(this.filteredData);

}

}
