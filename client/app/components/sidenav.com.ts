import { Component } from '@angular/core';

@Component({
  selector: 'survey-toolbar',
  template: `
  <md-toolbar>
    <h1>Survey App Menu</h1>
  </md-toolbar>
  <div>
    <md-button *ngFor="#btn of Buttons" (click)="#btn.click">
      {{#btn.txt}}
    </md-button>
  </div>
  `
})
export class SurveyToolbar {
  Buttons;

  constructor () {

  }

}
