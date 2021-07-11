import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ScreenSize } from 'src/app/services/screen-size-helper/types/screen-size.interface';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeHelperService {
  public sizeChanged = new Subject<ScreenSize>();
  private observer;

  constructor() {
    this.observer = new ResizeObserver(event => {
      const { width, height } = event[0].contentRect;
      this.sizeChanged.next({ width, height });
    });
    this.observer.observe(document.body);
  }
}
