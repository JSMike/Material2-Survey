import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

interface IUser {
  [key: string]: any;
}

@Injectable ()
export class SurveyLoginService {
  http: Http;
  userData: IUser;

  constructor(http: Http) {
    this.http = http;
    this.userData = {
      isLoggedIn: true,
      type: 'Admin'
    };
  }

  getUser(): Object {
    return this.userData;
  }

  login(credentials: Object): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/login', JSON.stringify(credentials), options)
      .map((res: Response) => res.json())
      .map(res => {
        this.userData = res;
        return res;
      });
  }

  logout(): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/logout', null, options)
      .map((res: Response) => res.json())
      .map(res => {
        this.userData = {
          isLoggedIn: false,
          type: 'anonymous'
        };
        return this.userData;
      });
  }

}
