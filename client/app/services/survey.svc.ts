import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export interface IOptions {
  id: number;
  text: string;
  results?: number;
}

export interface ISurvey {
  id: number;
  title: string;
  options: IOptions[];
  total?: number;
}

export interface IAnswer {
  survey_id: number;
  option_id: number;
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
    this.surveyData = {
      id: 0,
      title: 'What is your quest?',
      options: [
        { id: 0, text: 'I seek the Grail.', results: 7 },
        { id: 1, text: 'To take over the world!', results: 2 },
        { id: 2, text: 'To kill all humans.', results: 1 },
        {
          id: 3,
          text: 'To be a cat with a poptart body flying through space leaving a rainbow trail',
          results: 0
        }
      ],
      total: 10
    };
  }

  getSurvey(): ISurvey {
    return this.surveyData;
  }

  fetchSurvey(): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/survey', options)
      .map((res: Response) => res.json())
      .map(res => {
        this.surveyData = res;
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
        this.surveyData = res;
        this._surveyChangeObs.next(this.surveyData);
        return res;
      });
  }

  answerSurvey(answer: IAnswer): Observable<{}> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/answer', JSON.stringify(answer), options)
      .map((res: Response) => res.json())
      .map(res => {
        this.surveyData = res;
        this._surveyChangeObs.next(this.surveyData);
        return res;
      });
  }

}
