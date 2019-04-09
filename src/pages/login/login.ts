import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import{Http} from '@angular/http';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:String;
  password:String;
  result;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast:ToastController,private http:Http) {
  }
  public log(){
    if(this.username==""||this.password==""){
      const toast = this.toast.create({
        message: 'You must fill the two fields.',
        duration: 2000
      });
      toast.present();

    }
    else{
      console.log(this.password);
    this.http.get(`https://attendanceback.herokuapp.com/log/${this.username}/${this.password}`).toPromise().then((ress)=>{
      this.result=parseInt(ress.json());
      console.log(this.result);
    },(err)=>{
      console.log(err);
    });
    setTimeout(()=>{
      this.config();
    },3500);
  }
  }
  public config(){
    if(this.result==1){
      this.navCtrl.push(HomePage);
      console.log("Success");
    }
    else{
      const toast = this.toast.create({
        message: 'YOU ENTERED INVALIED USERNAME OR PASSWORD.',
        duration: 2000
      });
      toast.present();
      console.log("fail");
    }
  }
  login(){
    if(this.username==""||this.password==""){
      const toast = this.toast.create({
        message: 'You must fill the two fields.',
        duration: 2000
      });
      toast.present();

    }else {
      
    if(this.username==this.password){
      const toast = this.toast.create({
        message: 'welcome to class.',
        duration: 2000
      });
      toast.present();
      this.navCtrl.push(HomePage);
    }
    else{
      const toast = this.toast.create({
        message: 'YOU ENTERED INVALIED USERNAME OR PASSWORD.',
        duration: 2000
      });
      toast.present();
      console.log("fail");
    }
  }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
