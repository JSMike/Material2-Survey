import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {SurveySidenavService} from '../services/survey-sidenav.svc';

@Component({
  selector: 'survey-toolbar',
  template: `
    <button md-button (click)="sidenavToggle('start')" md-icon-button>
      <i class="material-icons app-toolbar-menu">menu</i>
    </button>
    Random Survey
  `,
  directives: [MdToolbar, MdButton]
})
export class SurveyToolbar {
  buttons: any;
  sidenavService: SurveySidenavService;

  constructor(sidenavService: SurveySidenavService) {
    this.buttons = [{ text: 'Admin', value: 1 }];
    this.sidenavService = sidenavService;
  }

  sidenavToggle (side: string): void {
    this.sidenavService.toggleSidenav(side);
  }
}
