import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

import {SurveyLoginService, IUser, ICredentials} from '../services/survey-login.svc';

@Component({
  selector: 'survey-login',
  templateUrl: '/app/components/templates/survey-login.html',
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyLogin {
  router: Router;
  login: ICredentials;
  loginSvc: SurveyLoginService;
  selectedIndex: number = -1;

  submit(): void {
    this.loginSvc.login(this.login).subscribe(res => {
      console.log(res);
    });
  }

  constructor(router: Router, loginSvc: SurveyLoginService) {
    this.router = router;
    this.loginSvc = loginSvc;
    this.loginSvc.login$.subscribe((res: IUser) => {
      if (res.isLoggedIn) {
        this.router.navigate(['List']);
      }
    });
    this.login = {
      username: '',
      password: ''
    };
  }

}
