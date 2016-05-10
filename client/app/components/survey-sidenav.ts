import { Component, ViewChild } from '@angular/core';
import {MdSidenav} from '@angular2-material/sidenav';
import {SurveySidenavService} from '../services/survey-sidenav.svc';

@Component({
  selector: 'survey-sidenav',
  template: `
  <md-sidenav #sidenav mode='side' align='start' class='app-sidenav'>
    <md-toolbar>
      Survey App Menu
    </md-toolbar>
    <md-button *ngFor='let btn of buttons' (click)='clickEvt()'>
      {{btn.text}}
    </md-button>
  </md-sidenav>
  `,
  directives: [MdSidenav],
  providers: [SurveySidenavService]
})
export class SurveySidenav {
  buttons;
  side = 'start';
  @ViewChild("md-sidenav") sidenav: MdSidenav;

  constructor(sidenavService: SurveySidenavService) {
    sidenavService.sidenavToggle$.subscribe(side => {
      if (side === 'start') {
        this.sidenav.toggle();
      }

    });

    this.buttons = [{ text: 'test', value: 0 }];

  }

}
