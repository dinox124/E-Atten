import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hour',
  templateUrl: 'hour.html',
})
export class HourPage {
  

 myDate: String = new Date().toLocaleDateString();
 dates:String=new Date().toLocaleDateString();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  datechange(myDates){
    this.dates=myDates;
    console.log(myDates);
  
  }

  ionViewDidLoad() {
     var displayDate = new Date().toDateString();
     console.log(this.myDate);
    console.log(displayDate)
    console.log('ionViewDidLoad HourPage');
    console.log(this.dates);
  }
 
  openstudent(hours) {
    this.navCtrl.push("StudentPage",{date:this.dates,hour:hours})
  }
}
