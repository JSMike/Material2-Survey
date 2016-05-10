import { Component } from '@angular/core';
import {MdSidenavLayout} from '@angular2-material/sidenav';
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

@Component({
  selector: 'survey-app',
  templateUrl: '/app/components/survey-app.html',
  directives: [
    MdSidenavLayout,
    MD_CARD_DIRECTIVES,
    MdButton,
    MdCheckbox,
    MdSpinner,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdProgressBar,
    SurveyToolbar,
    SurveySidenav
  ]
})
export class SurveyApp {

}
