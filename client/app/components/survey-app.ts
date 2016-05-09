import { Component } from '@angular/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

@Component({
  selector: 'survey-app',
  template: `
  <md-sidenav-layout>
  <md-sidenav #sidenav mode="side" class="app-sidenav">
    Sidenav
  </md-sidenav>

  <md-toolbar color="primary">
    <button class="app-icon-button" (click)="sidenav.toggle()">
      <i class="material-icons app-toolbar-menu">menu</i>
    </button>

    Angular Material2 Example App

    <span class="app-toolbar-filler"></span>
  </md-toolbar>

  <div class="app-content">

    <md-card class="app-input-section">
      <md-input placeholder="First name"></md-input>

      <md-input #nickname placeholder="Nickname" maxlength="50">
        <md-hint align="end">
          {{nickname.characterCount}} / 50
        </md-hint>
      </md-input>

      <md-input>
        <md-placeholder>
          <i class="material-icons app-input-icon">android</i> Favorite phone
        </md-placeholder>
      </md-input>

      <md-input placeholder="Motorcycle model">
        <span md-prefix>
          <i class="material-icons app-input-icon">motorcycle</i>
          &nbsp;
        </span>
      </md-input>
    </md-card>

    <md-card>
      <md-list class="app-list">
        <md-list-item *ngFor="let food of foods">
          <h3 md-line>{{food.name}}</h3>
          <p md-line class="demo-secondary-text">{{food.rating}}</p>
        </md-list-item>
      </md-list>
    </md-card>

    <md-card>
      <md-spinner class="app-spinner"></md-spinner>
      <md-spinner color="accent" class="app-spinner"></md-spinner>
    </md-card>

    <md-card>
      <label>
        Indeterminate progress-bar
        <md-progress-bar
            class="app-progress"
            mode="indeterminate"
            aria-label="Indeterminate progress-bar example"></md-progress-bar>
      </label>

      <label>
        Determinate progress bar - {{progress}}%
        <md-progress-bar
            class="app-progress"
            color="accent"
            mode="determinate"
            [value]="progress"
            aria-label="Determinate progress-bar example"></md-progress-bar>
      </label>
    </md-card>


    <md-card>
      <md-icon>build</md-icon>
    </md-card>

  </div>

</md-sidenav-layout>

<span class="app-action">
  <button md-fab><i class="material-icons md-24">check circle</i></button>
</span>
  `,
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdCheckbox,
    MdSpinner,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdProgressBar
  ]
})
export class SurveyApp {

}
