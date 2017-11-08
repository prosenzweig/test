import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUniversePage } from './add-universe';

@NgModule({
  declarations: [
    AddUniversePage,
  ],
  imports: [
    IonicPageModule.forChild(AddUniversePage),
  ],
})
export class AddUniversePageModule {}
