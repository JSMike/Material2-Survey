import * as _ from 'lodash';

import {Component, OnInit, Pipe} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

import {SurveyLoginService} from '../services/survey-login.svc';

interface ICondition {
  isLoggedIn?: boolean;
  type?: string;
}

interface IOption {
  title: string;
  action: string;
  condition?: ICondition;
}

@Pipe({
  name: 'ValidMenuItem'
})
export class ValidMenuItem {
  transform(options: IOption[], user: Object): IOption[] {
    return options.filter((option: IOption) => {
      let valid: boolean = true;
      _.each(option.condition, (val, key) => {
        valid = valid && user[key] === val;
      });
      return valid;
    });
  }
}

@Component({
  selector: 'survey-sidenav',
  templateUrl: '/app/components/templates/survey-sidenav.html',
  directives: [
    ROUTER_DIRECTIVES,
    MdToolbar,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  pipes: [ValidMenuItem]
})
export class SurveySidenav implements OnInit {
  options: IOption[];
  user: Object;
  router: Router;
  loginSvc: SurveyLoginService;

  actionItem(action: string): void {
    if (action === 'Logout') {
      this.loginSvc.logout().subscribe();
    } else {
      this.router.navigate([action]);
    }
  }

  constructor(router: Router, loginSvc: SurveyLoginService) {
    this.router = router;
    this.loginSvc = loginSvc;
    this.loginSvc.login$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.user = this.loginSvc.getUser();

    this.options = [
      {
        title: 'Log in',
        action: 'Login',
        condition: {
          isLoggedIn: false
        }
      },
      {
        title: 'Answer a Survey Question',
        action: 'View'
      },
      {
        title: 'Survey List',
        action: 'List',
        condition: {
          isLoggedIn: true,
          type: 'admin'
        }
      },
      {
        title: 'Create New Survey',
        action: 'Edit',
        condition: {
          isLoggedIn: true,
          type: 'admin'
        }
      },
      {
        title: 'Log out',
        action: 'Logout',
        condition: {
          isLoggedIn: true
        }
      }
    ];
  }
}
