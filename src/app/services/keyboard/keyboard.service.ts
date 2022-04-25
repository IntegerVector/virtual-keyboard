import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { allKeyCodes } from 'src/app/services/keyboard/constants/all-key-codes.constant';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  public subjects: any = {};

  constructor() {
    this.createSubjectForAllKeys();
    document.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      if (this.emitKeyInSubjects(event.code)) {
        event.preventDefault();
      }
    });
  }

  private emitKeyInSubjects(keyCode: string): boolean {
    if (this.subjects[keyCode]) {
      this.subjects[keyCode].next(keyCode);
      return true;
    }

    return false;
  }

  private createSubjectForAllKeys(): void {
    allKeyCodes.forEach(code => {
      this.subjects[code] = new Subject<string>();
    });
  }
}
