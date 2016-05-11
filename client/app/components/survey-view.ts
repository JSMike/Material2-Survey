import {Component, AfterViewInit} from '@angular/core';
import {Router, OnActivate} from '@angular/router-deprecated';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

@Component({
  selector: 'survey-view',
  templateUrl: '/app/components/templates/survey-view.html',
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyView implements OnActivate, AfterViewInit {
  router: Router;
  survey: Object;
  options: any[];
  selectedIndex: number = -1;

  submit(): void {
    console.log('submitted: ' + this.selectedIndex);
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
  }

  routerOnActivate(): void {
    console.log('router activate');
  }

  ngAfterViewInit(): void {
    console.log('view init');
  }

  constructor(router: Router) {
    console.log('constructor');
    this.router = router;
    this.router.subscribe(data => console.log(data));
    this.options = [
      {
        title: 'All the doors are locked! How did you get in here!?',
        options: [
          { id: 0, text: 'yes' },
          { id: 1, text: 'no' }
        ]
      }
    ];
  }

}
