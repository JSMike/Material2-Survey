import {Component, OnInit} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

import {SurveyService, ISurvey} from '../services/survey.svc';
import {SurveyLoginService, IUser} from '../services/survey-login.svc';

@Component({
  selector: 'survey-results',
  templateUrl: '/app/components/templates/survey-results.html',
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyResults implements OnInit {
  router: Router;
  routeParams: RouteParams;
  loginSvc: SurveyLoginService;
  surveySvc: SurveyService;
  survey: ISurvey;

  constructor(
      router: Router,
      routeParams: RouteParams,
      loginSvc: SurveyLoginService,
      surveySvc: SurveyService
    ) {
    this.router = router;
    this.routeParams = routeParams;
    this.surveySvc = surveySvc;
    this.surveySvc.survey$.subscribe((response: ISurvey) => {
      this.survey = response;
    });
    this.loginSvc = loginSvc;
    this.survey = {
      id: 0,
      title: 'Loading...',
      options: [],
      total: 0
    };
  }

  ngOnInit (): any {
    let user: IUser = this.loginSvc.getUser();
    let id = +this.routeParams.get('id');
    if (!user || !user.isLoggedIn || (user.type !== 'admin')) {
      return this.router.navigate(['View']);
    }

    if (id && +id >= 0) {
      this.survey.id = +id;
      this.surveySvc.fetchSurvey(this.survey.id).subscribe();
    } else {
      return this.router.navigate(['List']);
    }

  }

}
