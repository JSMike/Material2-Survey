import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

@Component({
  selector: 'survey-sidenav',
  templateUrl: '/app/components/templates/survey-sidenav.html',
  directives: [
    MdToolbar,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ]
})
export class SurveySidenav {
  list: any[];
  clickEvt(btn: number): void {
    console.log(btn);
  }

  constructor() {
    this.list = [
      { text: 'Log In', route: 'login' },
      { text: 'View Survey', route: 'view' },
      { text: 'Edit Survey Questions', route: 'edit' }
    ];
  }

}
