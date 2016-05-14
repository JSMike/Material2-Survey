import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

import {ISurvey} from '../services/survey.svc';
import {SurveyListService} from '../services/survey-list.svc';
import {SurveyLoginService, IUser} from '../services/survey-login.svc';

@Component({
  selector: 'survey-list',
  templateUrl: '/app/components/templates/survey-list.html',
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyList implements OnInit {
  router: Router;
  loginSvc: SurveyLoginService;
  surveys: any[];
  selectedIndex: number;
  surveyListService: SurveyListService;

  ngOnInit(): any {
    let user: IUser = this.loginSvc.getUser();
    if (!user || !user.isLoggedIn || (user.type !== 'admin')) {
      return this.router.navigate(['View']);
    }
  }

  action(id: number, action: string): void {
    if (action === 'Delete') {
      // http to delete api
      this.surveys.splice(id, 1);
    } else {
      this.router.navigate([action, { id: id }]);
    }
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
  }

  constructor(router: Router, surveyListService: SurveyListService, loginSvc: SurveyLoginService) {
    this.router = router;
    this.loginSvc = loginSvc;
    this.surveys = [];
    this.selectedIndex = -1;
    this.surveyListService = surveyListService;
    this.surveyListService.surveyList$.subscribe((response: ISurvey[]) => {
      this.surveys = response;
    });

    this.surveyListService.fetchSurveyList().subscribe();
  }

}
