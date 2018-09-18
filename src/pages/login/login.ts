import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  senha: string;
  login: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  realizarLogin(){    
    this.navCtrl.setRoot(HomePage);
  }
 

}
