import {Component} from '@angular/core';

import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';

import {SurveyService, ISurvey} from '../services/survey.svc';

interface IOption {
  id: number;
  text: string;
}

interface ISurveyResponse {
  survey: {
    title: string;
    id: number;
  };

  options: IOption[];
}

@Component({
  selector: 'survey-view',
  templateUrl: '/app/components/templates/survey-view.html',
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdIcon
  ]
})
export class SurveyView {
  surveyService: SurveyService;
  survey: ISurvey;
  selectedIndex: number;

  submit(): void {
    this.surveyService.answerSurvey({
      surveyId: this.survey.id,
      optionId: this.survey.options[this.selectedIndex].id
    }).subscribe();
  }

  setSelected(index: number): void {
    this.selectedIndex = index;
  }

  constructor(surveyService: SurveyService) {
    this.surveyService = surveyService;
    this.surveyService.survey$.subscribe((response: ISurvey) => {
      this.survey.title = response.title;
      this.survey.id = response.id;
      this.survey.options = response.options;
      this.selectedIndex = -1;
    });

    this.surveyService.fetchSurvey().subscribe();

    this.survey = {
      id: -1,
      title: 'Loading...',
      options: []
    };

    this.selectedIndex = -1;
  }

}
