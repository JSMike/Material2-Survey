import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

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
export class SurveyList {
  router: Router;
  surveys: any[];
  selectedIndex: number;

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

  constructor(router: Router) {
    this.router = router;
    this.surveys = [{
      id: 0,
      total: 10,
      title: 'All the doors are locked! How did you get in here!?'
    }];

    this.selectedIndex = -1;
  }

}
