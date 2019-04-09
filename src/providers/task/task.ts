import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Http,Headers} from '@angular/http';
/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {

  constructor(public http:Http) {
    console.log('Hello TaskProvider Provider');
  }
  updateStaus(movies){
    var headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http:/localhost:3000/api/uptask/'+movies._id,JSON.stringify(movies),{headers:headers}).
    pipe(map(res=>res.json()));
      
  }

}
