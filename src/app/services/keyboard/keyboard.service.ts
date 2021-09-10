import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  public keydown = new Subject<string>();
  public keyup = new Subject<string>();

  constructor() {
    document.addEventListener('keydown', event => {
      this.keydown.next(event.code);
    });

    document.addEventListener('keyup', event => {
      this.keyup.next(event.code);
    });
  }
}
