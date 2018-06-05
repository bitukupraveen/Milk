import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Coustomer } from '../../models/coustomer/coustomer.interface';
import { Payment } from '../../models/payment/payment.interface';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  payment = {} as Payment;
  coustomer = {} as Coustomer;
  AddmoneyTotal: number = 0;
  PaymoneyTotal: number = 0;
  RemmoneyTotal: number = 0;
  public UserPayments: any = [];
  coustomerSubscription: Subscription;
  coustomerRef$: FirebaseObjectObservable<Coustomer>;
  payRef$: FirebaseObjectObservable<Payment>;
  paymentRef$ : FirebaseListObservable<Payment[]>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {

    const coustomerId = this.navParams.get('coustomerId');
    this.coustomerRef$ = this.database.object(`coustomers/${coustomerId}`);
    this.coustomerSubscription = this.coustomerRef$.subscribe(coustomer => {
      this.coustomer = coustomer;
    });
   
    this.paymentRef$ = this.database.list('payment');
    this.paymentRef$.subscribe(payment => {
      payment.forEach(x => {
        if (x.coustomerId == coustomerId) {
        this.UserPayments.push(x)
        }
        if ((x.coustomerId == coustomerId) && (x.paymentStatus == "Add")) {
          this.AddmoneyTotal += x.money;

        }
        if ((x.coustomerId == coustomerId) && (x.paymentStatus == "Pay")) {
          this.PaymoneyTotal += x.money;

        }
        this.RemmoneyTotal = this.AddmoneyTotal- this.PaymoneyTotal
      })

    })

    
  }
  
  savePayment(payment: Payment) {
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var myDate = year + "-" + month + "-" + day

    const coustomerId = this.navParams.get('coustomerId');
    const promise =  this.paymentRef$.push({
        coustomerId: coustomerId,
    paymentDate:  myDate,
    money :Number(payment.money),
    paymentStatus :  "Add"
    });

    promise
        .then(_ => {
            console.log('Added payment');
            this.payment = {} as Payment;
            this.navCtrl.pop();
        } )
        .catch(err => console.log(err, 'Error Adding Item'));



}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
