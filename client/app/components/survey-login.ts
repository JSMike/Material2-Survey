import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

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
  title: string;
  options: any[];
  selectedIndex: number = -1;

  submit(): void {
    console.log('submitted: ' + this.selectedIndex);
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
  }

  constructor() {
    this.options = [{}];
  }

}
