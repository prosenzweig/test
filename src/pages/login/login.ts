import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
/*
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // Create an user from User class
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
  	public navCtrl: NavController, public navParams: NavParams) {
  }

 // Function Login who take an user in parameter 
 async login(user: User) {
 	try {
  		const result =	this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);

  		if(result) {
  			this.navCtrl.setRoot('HomePage');
  		}
    }
    catch(e) {
        console.error(e);
    }
  }

 // Function register who redirect the U in the register page
  register() {
  	this.navCtrl.push('RegisterPage');
  }

}
