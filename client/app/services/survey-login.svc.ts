import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export interface IUser {
  id?: number;
  username: string;
  type: string;
  isLoggedIn: boolean;
}

export interface ICredentials {
  username: string;
  password: string;
}

@Injectable ()
export class SurveyLoginService {
  router: Router;
  http: Http;
  userData: IUser;
  login$: Observable<{}>;
  private _loginStatusChangeObs: Observer<IUser>;

  constructor(@Inject(Http) http: Http, router: Router) {
    this.login$ = new Observable(observer => this._loginStatusChangeObs = observer).share();
    this.http = http;
    this.userData = {
      id: -1,
      username: 'anonymous',
      type: 'anonymous',
      isLoggedIn: false
    };
    this.router = router;
  }

  getUser(): IUser {
    return this.userData;
  }

  login(credentials: ICredentials): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/login', JSON.stringify(credentials), options)
      .map((res: Response) => res.json())
      .map(res => {
        this.userData = res.user;
        this._loginStatusChangeObs.next(res.user);
        this.router.navigate([res.redirect]);
        return res;
      });
  }

  logout(): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/logout', JSON.stringify({}), options)
      .map((res: Response) => res.json())
      .map(res => {
        this.userData = {
          id: -1,
          username: 'anonymous',
          type: 'anonymous',
          isLoggedIn: false
        };

        this._loginStatusChangeObs.next(this.userData);
        this.router.navigate(['View']);
        return res;
      });
  }

}
