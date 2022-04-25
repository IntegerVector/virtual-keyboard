import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  public keyDown$ = new Subject<KeyboardEvent>();

  constructor() {
    document.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      this.keyDown$.next(event);
    });
  }
}
