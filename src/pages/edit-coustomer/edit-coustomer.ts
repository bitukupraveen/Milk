import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Coustomer} from '../../models/coustomer/coustomer.interface';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

/**
 * Generated class for the EditCoustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-coustomer',
  templateUrl: 'edit-coustomer.html',
})
export class EditCoustomerPage {
  coustomer = {} as Coustomer;

  coustomerRef$ : FirebaseObjectObservable<Coustomer>;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcoustomerPage');
  }

    Editcoustomer(coustomer: Coustomer) {
        const promise =  this.coustomerRef$.update({
            Name: coustomer.Name,
            Description: coustomer.Description,
            Number: Number(coustomer.Number),
        });
        promise
            .then(_ => {
                console.log('Updated Coustomer')
                this.navCtrl.pop();
            })
            .catch(err => console.log(err, 'Error Updating Coustomer'));
    }

    ionViewWillLeave(){
      this.coustomerSubscription.unsubscribe();
    }
}
