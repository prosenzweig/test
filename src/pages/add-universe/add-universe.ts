import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
//Use for authentification
import { AngularFireAuth } from 'angularfire2/auth';
//Use for databas insert and delete
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

//Share the Universe Model
import { UniverseItem } from '../../models/universe/universe.interface';

/**
 * Generated class for the AddUniversePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-universe',
  templateUrl: 'add-universe.html',
})
export class AddUniversePage {

  //Creating a new Obj Universe Item
  universeItem = {} as UniverseItem;	
  // représente la racine de la DB Piple
  universeItemRef$: FirebaseListObservable<UniverseItem[]>
  // Use to debug in the console
  universeListRef$: FirebaseListObservable<UniverseItem[]>

  constructor(
  	public navCtrl: NavController,
  	private afData: AngularFireDatabase,
  	private afAuth: AngularFireAuth,
  	public navParams: NavParams) { 

    // Remplacer par /Universe/ pour la vrai database, Universe-list pour les test
    this.universeItemRef$ = this.afData.list('/Universe-list/');
    //this.universeListRef$.subscribe(x => console.log(x)); //This line bug

  }

  addUniverseItem(universeItem: UniverseItem){
    this.universeItemRef$.push({
       universeName: this.universeItem.universeName
    });

    // RAZ de l'object
    this.universeItem = {} as UniverseItem;
  }

}
