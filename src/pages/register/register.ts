import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {
    email : '',
    password: ''
} as User;

  error;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  async register(user: User) {
    console.log("Register:", user);
    try {
        const result = await this.authProvider.register(user);
        if (result) {
            this.navCtrl.setRoot('ItemsListPage');
        }
    } catch (e) {
        // console.error(e);
        this.error = e;
    }
}
}
