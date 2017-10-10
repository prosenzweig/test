import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//Use for authentification
import { AngularFireAuth } from 'angularfire2/auth';
//Use for databas insert and delete
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

import { UniverseItem } from '../../models/universe/universe.interface';

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

  arrData = []

  // Creating a new object
  // we use this object in the HTML page 
  universeItem = {} as UniverseItem;

  // Use for create a universe
  universeItemRef$: FirebaseListObservable<UniverseItem[]>
  
  //Use for list all universe
  universeListRef$: FirebaseListObservable<UniverseItem[]>


  constructor(
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    private afData: AngularFireDatabase,
  	public navCtrl: NavController, 
    public navParams: NavParams) {

    this.afData.list("/Universe/").subscribe( _data => {
       this.arrData = _data;
       console.log(this.arrData);
    });

    this.universeItemRef$ = this.afData.list('Universe-list');

    this.universeListRef$ = this.afData.list('Universe-list');
    this.universeListRef$.subscribe(x => console.log(x));

    }

  addUniverseItem(universeItem: UniverseItem){
    this.universeItemRef$.push({
       universeName: this.universeItem.universeName
    });

    // RAZ de l'object
    this.universeItem = {} as UniverseItem;

  }

  getItems() {
    return this.afData.list('/Universe/');
  }

  ionViewDidLoad() {
  	// Verification is the Login succeed
  	this.afAuth.authState.subscribe(data => {
  		if(data.email && data.uid){
     		this.toast.create({
    			message: `Welcome to PiPle, ${data.email}`,
    			duration: 3000
    		}).present();
    	}
   		else {
     		this.toast.create({
    			message: `Could not find authentification details`,
    			duration: 3000
    		}).present();
    	}
   	});
  }
}
