import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniverseViewPage } from './universe-view';

@NgModule({
  declarations: [
    UniverseViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UniverseViewPage),
  ],
})
export class UniverseViewPageModule {}
