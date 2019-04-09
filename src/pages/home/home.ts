import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openActions(){
    this.navCtrl.push("ActionsPage")
  }
  openActions2(){
    this.navCtrl.push("AttendancePage")
  }

}
