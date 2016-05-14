import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {ISurvey} from './survey.svc';

@Injectable ()
export class SurveyListService {
  http: Http;
  surveyList: ISurvey[];
  surveyList$: Observable<{}>;
  private _surveyListChangeObs: Observer<ISurvey[]>;

  constructor(http: Http) {
    this.surveyList$ = new Observable<ISurvey>(observer => this._surveyListChangeObs = observer)
      .share();
    this.http = http;
    this.surveyList = [];
  }

  getSurveyList(): ISurvey[] {
    return this.surveyList;
  }

  fetchSurveyList(): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get('/api/survey-list', options)
      .map((res: Response) => res.json())
      .map(res => {
        this.surveyList = res;
        this._surveyListChangeObs.next(this.surveyList);
        return res;
      });

  }

}
