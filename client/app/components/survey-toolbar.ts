import { Component, Output, EventEmitter } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {SurveySidenavService} from '../services/survey-sidenav.svc';

@Component({
  selector: 'survey-toolbar',
  template: `
  <md-toolbar color="primary">
    <button md-button (click)="sidenavToggle('start')">
      <i class="material-icons app-toolbar-menu">menu</i>
    </button>
    Random Survey

  </md-toolbar>
  `,
  styles: ['.app-toolbar-menu { position: relative; top: 6px; }'],
  directives: [MdToolbar, MdButton],
  providers: [SurveySidenavService]
})
export class SurveyToolbar {
  buttons;
  sidenavService;

  constructor(sidenavService: SurveySidenavService) {
    this.buttons = [{ text: 'Admin', value: 1 }];
    this.sidenavService = sidenavService;
  }

  sidenavToggle (side) {
    this.sidenavService.announceToggle(side);
  }
}
