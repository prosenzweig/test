import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//Use for authentification
import { AngularFireAuth } from 'angularfire2/auth';
//Use for databas insert and delete
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

import { UniverseItem } from '../../models/universe/universe.interface';

import { AddUniversePage } from '../add-universe/add-universe';


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

  // Creating a new object
  // we use this object in the HTML page 
  universeItem = {} as UniverseItem;

  // Use for create a universe
  universeItemRef$: FirebaseListObservable<UniverseItem[]>

  //Test
  universeOnlyItemRef$: FirebaseListObservable<UniverseItem[]>
  
  //Use for list all universe
  universeListRef$: FirebaseListObservable<UniverseItem[]>

  //test
  universeOnlyListRef$: FirebaseListObservable<UniverseItem[]>
  
  //Auth
  whoAmI;

  constructor(
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    private afData: AngularFireDatabase,
  	public navCtrl: NavController, 
    public navParams: NavParams) {

    this.afAuth.authState.subscribe(auth => console.log(auth));
    this.whoAmI = this.afAuth.auth['currentUser']['email'];


    //Permet d'accéder en haut de l'arbre
    this.universeItemRef$ = this.afData.list('Universe-list');

    this.universeListRef$ = this.afData.list('Universe-list');
    this.universeListRef$.subscribe(x => console.log(x));

    // Test avec Universe seulement
    this.universeOnlyItemRef$ = this.afData.list('/Universe/');

    this.universeOnlyListRef$ = this.afData.list('/Universe/');
    this.universeOnlyListRef$.subscribe(x => console.log(x));    

    }
 

  addUniverseItem(universeItem: UniverseItem){
    this.universeItemRef$.push({
       universeName: this.universeItem.universeName
    });

    // RAZ de l'object
    this.universeItem = {} as UniverseItem;
  }


  /*getUser(){
    var user = this.afAuth.auth['currentUser']['email'];
    if( user != null){
    console.log(user);
    return (user);
    }
    return "bob";
  }*/


  //Use to go to he page for create a new universe
  NavigateToAddUniversePage () {
    this.navCtrl.push(AddUniversePage);
  }


  //Verifier la connection quand on arrive sur la home page
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
