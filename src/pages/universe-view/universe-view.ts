import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UniverseViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-universe-view',
  templateUrl: 'universe-view.html',
})
export class UniverseViewPage {

  universeObj; // the object is the througt a parameter from home.html

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.universeObj = navParams.get('param1');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniverseViewPage');
    console.log('MOIList : ');
    console.log(this.universeObj.MOIList[0].Father.Children.length);
  }

}
