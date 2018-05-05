import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Coustomer} from '../../models/coustomer/coustomer.interface';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/**
 * Generated class for the AddCoustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-coustomer',
  templateUrl: 'add-coustomer.html',
})
export class AddCoustomerPage {

  coustomer = {} as Coustomer;

  itemsRef$ : FirebaseListObservable<Coustomer[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
  ) {
    this.itemsRef$ = this.database.list('coustomers');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCoustomerPage');
  }
  saveCoustomer(coustomer: Coustomer) {
    console.log(coustomer);


    const promise =  this.itemsRef$.push({
        Name: coustomer.Name,
        Description: coustomer.Description,
        Number: Number(coustomer.Number),
    });
    promise
        .then(_ => {
            console.log('Added Item');
            this.coustomer = {} as Coustomer;
            this.navCtrl.pop();
        } )
        .catch(err => console.log(err, 'Error Adding Coustomer'));



}
}
