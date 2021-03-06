// angular2 + material2 directives/providers
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {SurveyEdit} from './survey-edit';
import {SurveyList} from './survey-list';
import {SurveyLogin} from './survey-login';
import {SurveyResults} from './survey-results';
import {SurveyView} from './survey-view';
import {SurveyToolbar} from './survey-toolbar';
import {SurveySidenav} from './survey-sidenav';
import {SurveySidenavService} from '../services/survey-sidenav.svc';
import {SurveyLoginService} from '../services/survey-login.svc';
import {SurveyService} from '../services/survey.svc';
import {SurveyListService} from '../services/survey-list.svc';

@Component({
  selector: 'survey-app',
  templateUrl: '/app/components/templates/survey-app.html',
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
    MdRadioButton,
    MdCheckbox,
    MdSpinner,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdProgressBar,
    MdToolbar,
    MdIcon,
    SurveyToolbar,
    SurveySidenav,
    SurveyEdit
  ],
  providers: [
    MdIconRegistry,
    MdRadioDispatcher,
    SurveySidenavService,
    SurveyLoginService,
    SurveyService,
    SurveyListService
  ]
})
@RouteConfig ([
  {
    path: '/view',
    name: 'View',
    component: SurveyView,
    useAsDefault: true
  },
  {
    path: '/login',
    name: 'Login',
    component: SurveyLogin
  },
  {
    path: '/list',
    name: 'List',
    component: SurveyList
  },
  {
    path: '/edit',
    name: 'Edit',
    component: SurveyEdit
  },
  {
    path: '/results',
    name: 'Results',
    component: SurveyResults
  }
])
export class SurveyApp implements AfterViewInit {
  buttons: any;
  side: string = 'start';
  toggler: any;
  sidenavService: SurveySidenavService;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  ngAfterViewInit(): void {
    this.toggler = () => {
      this.sidenav.toggle();
    };
  }

  constructor(sidenavService: SurveySidenavService) {
    sidenavService.sidenavToggle$.subscribe(side => {
      if (side === 'start') {
        this.toggler();
      }
    });
    this.buttons = [{ text: 'test', value: 0 }];
  }
}
