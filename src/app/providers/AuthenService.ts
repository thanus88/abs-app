import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  //public SERVICE_URL = 'https://8080-dot-6202853-dot-devshell.appspot.com';
  public SERVICE_URL = 'http://localhost:1337/localhost:8084';
  //public SERVICE_URL = 'http://localhost:8084';
  public CUSTOMER_API = this.SERVICE_URL + '/customers';
  public LOGIN_API = this.SERVICE_URL + '/login';
  public SIGN_UP_API = this.SERVICE_URL + '/signup';
  headerOptions : any

  constructor(public http: HttpClient) {
    
  }

  getAll(): any {
    console.log('TEST getAll..');
    return this.http.get(this.CUSTOMER_API, { headers : this.headerOptions });
  }

  login(user: any) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', user.email);
    urlSearchParams.append('password', user.password);
    let headers = new HttpHeaders ();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.LOGIN_API + '?' + 'email='+user.email, { headers : headers});
  }

  save(user: any): any {
    let result: Object;
    console.log(this.CUSTOMER_API);

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', user.email);
    let headers = new HttpHeaders ();
    headers.append('Access-control-allow-origin', '*');
   // return this.http.post(this.LOGIN_API + '?' + 'email='+user.email, { headers : headers});

    if (user.id) {
      result = this.http.put(this.SIGN_UP_API+'/'+user.id, user, { headers : headers });
    } else {
      result = this.http.post(this.SIGN_UP_API, user, { headers : headers });
    }
    return result;
  }

  remove(id: string) {
    return this.http.delete(id);
  }
}
