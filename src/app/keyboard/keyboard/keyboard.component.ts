import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { KeyboardRow } from './types/keyboard-row.interface';
import { Key } from '../key/types/key.interface';
import { UserAgentService } from 'src/app/services/user-agent/user-agent.service';
import { BaseKeyboardStrategy } from 'src/app/keyboard/keyboard/strategies/base-keyboard.strategy';
import { getStrategy } from 'src/app/keyboard/keyboard/keyboard-strategy.factory';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnChanges {
  @Input()
  layoutData!: LayoutData;
  @Input() isMobileView = false;

  @Output() onKey = new EventEmitter<string>();

  public rows: KeyboardRow[] = [];
  public keyboardStrategy!: BaseKeyboardStrategy;

  private osType = this.userAgentService.getOSName();

  constructor(private userAgentService: UserAgentService) { }

  public ngOnChanges(): void {
    this.keyboardStrategy = getStrategy({
      isMobile: this.isMobileView,
      osType: this.osType
    });

    this.rows = this.keyboardStrategy.extendRowsData(this.layoutData);
  }

  public handleKey(key: Key): void {
    const res = this.keyboardStrategy.handleKey(key);
    if (res) {
      this.onKey.emit(res);
    }
  }
}
