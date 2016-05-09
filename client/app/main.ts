///<reference path="../../typings/browser.d.ts"/>

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {enableProdMode} from '@angular/core';
import {SurveyApp} from './components/survey-app';

if (window.location.protocol === "https:") {
  enableProdMode();
}

bootstrap(SurveyApp, [
  HTTP_PROVIDERS
]);
