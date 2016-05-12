import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

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
  id: number;
  survey: Object;
  routeParams: RouteParams;

  constructor(routeParams: RouteParams) {
    this.routeParams = routeParams;
  }

  ngOnInit (): void {
    this.id = +this.routeParams.get('id');
    console.log(this.id);
    this.survey = {
      title: 'What is your quest?',
      options: [
        { id: 0, text: 'I seek the Grail.', results: 7 },
        { id: 1, text: 'To try to take over the world!', results: 2 },
        { id: 1, text: 'To kill all humans.', results: 1 }
      ],
      total: 10
    };
  }

}
