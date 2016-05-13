import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

interface IUser {
  [key: string]: any;
}

@Injectable ()
export class SurveyLoginService {
  router: Router;
  http: Http;
  userData: IUser;
  login$: Observable<IUser>;
  private _loginStatusChangeObs: Observer<IUser>;

  constructor(@Inject(Http) http: Http, router: Router) {
    this.login$ = new Observable(observer => this._loginStatusChangeObs = observer).share();
    this.http = http;
    this.userData = {
      isLoggedIn: false,
      type: 'anonymous'
    };
    this.router = router;
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
        this._loginStatusChangeObs.next(res.user);
        this.router.navigate(res.redirect);
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
        this._loginStatusChangeObs.next(this.userData);
        return this.userData;
      });
  }

}
