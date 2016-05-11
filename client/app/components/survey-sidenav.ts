import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';

@Component({
  selector: 'survey-sidenav',
  template: `
    <md-toolbar color="accent">
      Survey App Menu
    </md-toolbar>
    <md-nav-list>
      <button md-button *ngFor='let btn of buttons' (click)='clickEvt(btn)' color="accent">
        {{btn.text}}
      </button>
    </md-nav-list>
  `,
  directives: [MdToolbar, MdButton]
})
export class SurveySidenav {
  buttons: any;
  clickEvt(btn: number): void {
    console.log(btn);
  }

  constructor() {
    this.buttons = [{ text: 'test', value: 0 }];
  }

}
