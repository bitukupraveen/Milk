import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Coustomer} from '../../models/coustomer/coustomer.interface';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  coustomerRef$: FirebaseListObservable<Coustomer[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController
              ) {
    this.coustomerRef$ = this.database.list('coustomers');
  }
  // Add daily
  addDaily(coustomer: Coustomer){
    this.navCtrl.push('DailyPage', {
        coustomerId: coustomer.$key
      })
  }

  selectCoustomer(coustomer: Coustomer){
    console.log(coustomer.Name);

    this.actionSheetCtrl.create({
        title: `${coustomer.Name}`,
        buttons: [
            {
                text: 'Edit',
                handler: () => {
                    console.log('Edit clicked');
                    this.navCtrl.push('EditCoustomerPage', {
                      coustomerId: coustomer.$key
                    })
                }
            },
            {
                text: 'Delete',
                role: 'destructive',
                handler: () => {
                    console.log('Delete clicked');
                    const promise =  this.coustomerRef$.remove(coustomer.$key);
                    promise
                        .then(_ => console.log('Deleted Coustomer'))
                        .catch(err => console.log(err, 'Error Deleted Coustomer'));
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
        ]
    }).present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }
  goToAddCoustomerPage() {
    console.log("Working");
        this.navCtrl.push('AddCoustomerPage');
    }
}
