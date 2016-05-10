import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable ()
export class SurveySidenavService {
  private surveySidenavToggle = new Subject<string>();

  sidenavToggle$ = this.surveySidenavToggle.asObservable();

  announceToggle(side: string) {
    this.surveySidenavToggle.next(side);
  }
}