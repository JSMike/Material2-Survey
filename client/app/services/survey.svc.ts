import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export interface IOptions {
  id?: number;
  text: string;
  results?: number;
}

export interface ISurvey {
  id?: number;
  title: string;
  options: IOptions[];
  total?: number;
}

export interface IAnswer {
  surveyId: number;
  optionId: number;
}

@Injectable ()
export class SurveyService {
  http: Http;
  surveyData: ISurvey;
  survey$: Observable<ISurvey>;
  private _surveyChangeObs: Observer<ISurvey>;

  constructor(http: Http) {
    this.survey$ = new Observable<ISurvey>(observer => this._surveyChangeObs = observer).share();
    this.http = http;
  }

  getSurvey(): ISurvey {
    return this.surveyData;
  }

  fetchSurvey(id?: number): Observable<{}> {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options: any = { headers: headers };
    let ReqOptions: RequestOptions;
    let search = new URLSearchParams();

    if (id) {
      search.set('id', '' + id);
      options.search = search;
    }

    ReqOptions = new RequestOptions(options);

    return this.http.get('/api/survey', ReqOptions)
      .map((res: Response) => res.json())
      .map(res => {
        this.surveyData = {
          total: res.survey.total,
          title: res.survey.title,
          id: res.survey.id,
          options: res.options
        };
        this._surveyChangeObs.next(this.surveyData);
        return res;
      });

  }

  upsertSurvey(survey: ISurvey): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/survey', JSON.stringify(survey), options)
      .map((res: Response) => res.json())
      .map(res => {
        return {
          title: res.survey.title,
          id: res.survey.id,
          options: res.options
        };
      });

  }

  answerSurvey(answer: IAnswer): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/answer', JSON.stringify(answer), options)
      .map((res: Response) => res.json())
      .map(res => {
        this.fetchSurvey().subscribe();
        return res;
      });

  }

}
