import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  //urlBase = "http://103.143.76.242:4322/api/";
  //urlBase = "http://localhost:4100/api/";
  urlBase = "https://localhost:44315/api/";
  auth: any = '';
  setAuthToken() {
    this.auth = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
  }
  post(url: any, data: any) {
    var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'token': this.auth });
    // var options = new RequestOptions({ headers: headers });

    //    return this.http.post(this.urlBase + url, data,options).pipe(map((res: any) => {
    return this.http.post(this.urlBase + url, data).pipe(map((res: any) => {
      return res;
    }));
  }
  get(url: any, data = null) {

    var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'token': this.auth });
    // var options = new RequestOptions({ headers: headers });
    return this.http.get(this.urlBase + url).pipe(map((res: any) => {
      //    return this.http.get(this.urlBase + url,options).pipe(map((res: any) => {
      return res;
    }));
  }
}
