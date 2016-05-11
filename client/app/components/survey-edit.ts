import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

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
export class SurveyEdit {
  title: string;
  options: any[];
  selectedIndex: number = -1;
  addOption(): void {
    this.options.push({});
  }

  deleteOption(opt: number): void {
    this.options.splice(opt, 1);
  }

  save(): void {
    console.log('title: ' + this.title + ', options: ' +
        JSON.stringify(this.options.map((el, idx) => { el.id = idx; return el; })));
  }

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
