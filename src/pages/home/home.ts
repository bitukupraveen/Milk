import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Coustomer} from '../../models/coustomer/coustomer.interface';
import {Item} from '../../models/item/item.interface';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  coustomerRef$: FirebaseListObservable<Coustomer[]>;
  itemsRef$: FirebaseListObservable<Item[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
              ) {
    this.coustomerRef$ = this.database.list('coustomers');
    this.itemsRef$ = this.database.list('items');
              }
        
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
