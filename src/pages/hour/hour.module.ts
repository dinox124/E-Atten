import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HourPage } from './hour';

@NgModule({
  declarations: [
    HourPage,
  ],
  imports: [
    IonicPageModule.forChild(HourPage),
  ],
})
export class HourPageModule {}
