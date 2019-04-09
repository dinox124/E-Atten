import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  form: FormGroup;
  orders = [];
  hour;
  dat;
  public  count:Number;
  constructor(private formBuilder: FormBuilder, private http: Http, private view: ViewController, private navparams: NavParams, public alertCtrl: AlertController, public navCtrl: NavController) {

    this.dat = this.navparams.get('date');
    this.hour = this.navparams.get('hour');
    console.log(this.dat);
    console.log(this.hour);
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
    of(this.getOrders()).subscribe(orders => {
      console.log(orders);
      this.orders = orders;
      this.addCheckboxes();
    });
    console.log(this.orders);

  }
  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl();
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  getOrders() {
    this.http.get("https://collegekarur.herokuapp.com/atten").toPromise().then((studentList) => {

      this.orders = studentList.json();
      console.log(this.orders);
     

    }, (err) => {
      console.log(err);
    })
      
   
    return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ]
  }
  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? (this.orders[i].id) : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds)
    const selectedOrdernames = this.form.value.orders
      .map((v, i) => v ? (this.orders[i].name) : null)
      .filter(v => v !== null);
    console.log(selectedOrdernames);
    let arr = "";
    for (let i = 0; i < selectedOrderIds.length; i++) {
      arr += "<ul>";
      arr += "<li>"
      arr += selectedOrderIds[i];
      arr += "    :    ";
      arr += selectedOrdernames[i];
      arr += "</li></ul>";
    }
    let alert = {
      title: 'Absent Students',
      subTitle: arr,
      message: '',
        buttons: [{
        text: 'Disagree',
        role: 'cancel',
        color: 'danger',
        handler: () => {
          console.log('cancel success');
        }
      }, {
        text: 'Agree',
        role: 'Agree',
        handler: () => {
          this.http.post(`https://attendanceback.herokuapp.com/Atten`, {
            Date: this.dat,
            Hour: this.hour,
            Present: selectedOrderIds
          }).toPromise().then((response) => {
            console.log("success");
          }, (err) => {
            console.log(err);
          });
          this.navCtrl.push("HourPage");
        }
      }]
    };
    let alerts = this.alertCtrl.create(alert)
    alerts.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

}

