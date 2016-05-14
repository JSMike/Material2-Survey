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
  selector: 'survey-edit',
  templateUrl: '/app/components/templates/survey-edit.html',
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyEdit implements OnInit {
  router: Router;
  loginSvc: SurveyLoginService;
  routeParams: RouteParams;
  surveySvc: SurveyService;
  survey: ISurvey;
  selectedIndex: number = -1;
  addOption(): void {
    this.survey.options.push({ text: '' });
  }

  deleteOption(opt: number): void {
    this.survey.options.splice(opt, 1);
  }

  save(): void {
    this.surveySvc.upsertSurvey(this.survey).subscribe(res => {
      this.router.navigate(['List']);
    });
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
  }

  ngOnInit(): any {
    let user: IUser = this.loginSvc.getUser();
    let id = this.routeParams.get('id');

    if (!user || !user.isLoggedIn || (user.type !== 'admin')) {
      return this.router.navigate(['View']);
    }

    if (id && +id > 0) {
      this.survey.id = +id;
      this.surveySvc.fetchSurvey(this.survey.id).subscribe();
    }
  }

  constructor(
      router: Router,
      routeParams: RouteParams,
      surveySvc: SurveyService,
      loginSvc: SurveyLoginService
    ) {
    this.router = router;
    this.routeParams = routeParams;
    this.loginSvc = loginSvc;
    this.surveySvc = surveySvc;
    this.surveySvc.survey$.subscribe((response: ISurvey) => {

      this.survey = response;
    });

    this.survey = {
      title: '',
      options: [{
        text: ''
      }]
    };
  }

}
