import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Http } from "@angular/http";



@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  moviesList = [];
  totalArray = [];
  studentList;
  totalhour;
  Rn;
  Per;
  absentHour;
  valueList = [0];
  from: String = new Date().toLocaleDateString();
  to: String = new Date().toLocaleDateString();
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,public toast:ToastController) {

    this.http.get("https://attendanceback.herokuapp.com/count").toPromise().then((filmList) => {
      // console.log(filmList.json());
      this.totalhour = filmList.json();
      this.moviesList = Array.of(filmList.json());
    }, (err) => {
      console.log(err);
    });

    this.http.get("https://collegekarur.herokuapp.com/atten").toPromise().then((filmList) => {
      // console.log(filmList.json());
      this.studentList = filmList.json();
      // console.log(this.studentList[1].id);

    }, (err) => {
      console.log(err);
    });
    this.con();
  }

  public updateItem() {
    for (let i = 0; i < this.studentList.length; i++) {
      // console.log(this.studentList[i].id);
      this.http.get(`https://attendanceback.herokuapp.com/getid/${this.studentList[i].id}`).toPromise().then((movie) => {
        // console.log(movie.json());
        this.studentList[i].value = movie.json();
        // console.log(this.studentList[i].value);
        this.Rn = (this.totalhour) - (movie.json());
        this.studentList[i].persentage = ((this.Rn / this.totalhour) * 100).toFixed(0);
        this.studentList[i].present = this.Rn;
        // console.log(this.studentList[i].persentage);
      });

    }
  }
  fromchange(date) {
    this.from = date;
  }
  tochange(date) {
    this.to = date;
    console.log(this.from);
    console.log(this.to);
  }
  public show() {
    if(this.from<=this.to){
    console.log("Success");
    console.log(this.from);
    console.log(this.to);
    this.http.get(`https://attendanceback.herokuapp.com/retrive/${this.from}/${this.to}`).toPromise().then((movie) => {
      this.totalhour = movie.json();
      this.moviesList = Array.of(movie.json());
    }, (err) => {
      console.log(err);
    });
    for (let i = 0; i < this.studentList.length; i++) {

      this.http.get(`https://attendanceback.herokuapp.com/retriveid/${this.from}/${this.to}/${this.studentList[i].id}`).toPromise().then((movie) => {

        this.studentList[i].value = movie.json();

        this.Rn = (this.totalhour) - (movie.json());
        this.studentList[i].persentage = ((this.Rn / this.totalhour) * 100).toFixed(0);
        this.studentList[i].present = this.Rn;

      });

    }
  }
  else{
    const toast = this.toast.create({
      message: 'YOU ENTERED INVALIED DATEs.',
      duration: 2000
    });
    toast.present();
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  con() {
    setTimeout(() => {
      this.updateItem();
    },
      10000);

  }



}
