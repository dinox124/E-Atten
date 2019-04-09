import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HourPage } from '../hour/hour';
import {ReportPage} from '../report/report';


/**
 * Generated class for the ActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  openHour(){
    this.navCtrl.push("HourPage")
  }
  openReport(){
    this.navCtrl.push("ReportPage")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionsPage');
  }

}
