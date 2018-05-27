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
  public months: any = [];
  public filteredData: any = [];
  public daywise: any = [];
  public items: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {




    const coustomerId = this.navParams.get('coustomerId');
    this.coustomerRef$ = this.database.object(`coustomers/${coustomerId}`);
    this.dailyRef$ = this.database.list('daily');
    this
      .dailyRef$
      .forEach(item => {
        item.forEach(x => {

          if (x.coustomerId == coustomerId) {
            this.daywise.push(x);
            this.months.push(x.todayDate);
          }

        })

      })
    console.log(this.months)

    let map = new Map();
    for (var element of this.months) {
      map.set(element, element);
    }


    map.forEach((value, key, map) => {
      this.filteredData.push(value);
    });
    this.coustomerSubscription = this.coustomerRef$.subscribe(coustomer => {
      this.coustomer = coustomer;
    })



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyListPage');

    /* this
      .dailyRef$
      .forEach(item => {

        item.forEach(x => {

         this.daywise.push(x.todayDate);
        })
      })

      let unique = this.daywise.concat(this.daywise).filter((obj, key, array) => array.map((obj2) => obj !== obj2));
      console.log(unique)
      
       let map = new Map();
       for (var element of this.daywise) {
         map.set(element, element);
       }
       
       
       map.forEach( (value, key, map) => {
         this.filteredData.push(value);
       });
       
       // Print filtered data
       console.log(this.filteredData); */

  }

}
