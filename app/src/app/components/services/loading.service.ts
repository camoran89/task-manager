import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading;

  public readonly loading;

  constructor() {
    this._loading = new BehaviorSubject<boolean>(false);
    this.loading = this._loading.asObservable();
  }

  show(): void {
    this._loading.next(true);
  }

  hide(): void {
    this._loading.next(false);
  }
}
