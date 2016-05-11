// angular2 + material2 directives/providers
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {SurveyToolbar} from './survey-toolbar';
import {SurveySidenav} from './survey-sidenav';
import {SurveySidenavService} from '../services/survey-sidenav.svc';
import {SurveyEdit} from './survey-edit';

@Component({
  selector: 'survey-app',
  templateUrl: '/app/components/templates/survey-app.html',
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
    MdRadioButton,
    MdCheckbox,
    MdSpinner,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdProgressBar,
    MdToolbar,
    MdIcon,
    SurveyToolbar,
    SurveySidenav,
    SurveyEdit
  ],
  providers: [MdIconRegistry, MdRadioDispatcher, SurveySidenavService]
})
export class SurveyApp implements AfterViewInit {
  buttons: any;
  side: string = 'start';
  toggler: any;
  sidenavService: SurveySidenavService;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  ngAfterViewInit(): void {
    this.toggler = () => {
      this.sidenav.toggle();
    };
  }

  clickEvt(id: number): void {
    console.log(id);
  }

  constructor(sidenavService: SurveySidenavService) {
    sidenavService.sidenavToggle$.subscribe(side => {
      if (side === 'start') {
        this.toggler();
      }

    });
    this.buttons = [{ text: 'test', value: 0 }];
  }
}
