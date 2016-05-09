import { Component } from '@angular/core';

@Component({
  selector: 'survey-toolbar',
  template: `
  <md-toolbar>
    <md-icon font="fa" icon="menu" (click)="sidenavToggle(evt)"></md-icon>
    <h1>Survey App</h1>
  </md-toolbar>
  `
})
export class SurveyToolbar {

}
