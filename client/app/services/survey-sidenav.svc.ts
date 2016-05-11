import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable ()
export class SurveySidenavService {
  sidenavToggle$: Observable<{}>;
  private _sidenavToggleObs: Observer<string>;
  toggleSidenav (side: string): void {
    this._sidenavToggleObs.next(side);
  }

  constructor() {
    this.sidenavToggle$ = new Observable(observer => this._sidenavToggleObs = observer).share();
  }
}
