import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { KeyboardService } from 'src/app/services/keyboard/keyboard.service';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { KeyboardRow } from './types/keyboard-row.interface';
import { Key } from '../key/types/key.interface';
import { UserAgentService } from 'src/app/services/user-agent/user-agent.service';
import { SupportedOS } from 'src/app/services/user-agent/types/supported-os.enum';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  layoutData!: LayoutData;

  @Input() isMobileView = false;

  @Output() onKey = new EventEmitter<string>();

  public rows: KeyboardRow[] = [];

  private isShiftSticking = false;
  private isAltSticking = false;
  private serviceKeys = {
    ShiftLeft: 'ShiftLeft',
    AltRight: 'AltRight'
  };

  private stickingKeyColor = '#000000';
  private serviceKeyColor = '#CCCCCC';
  private regularKeyColor = '#FFFFFF';

  private subscriptions: Subscription[] = [];
  private osType = this.userAgentService.getOSName();

  constructor(
    private keyboardService: KeyboardService,
    private userAgentService: UserAgentService
  ) { }

  public ngOnInit(): void {
    this.initSubscribers();
  }

  public ngOnChanges(): void {
    const rows = this.generateRows();
    this.rows = this.extendLayoutData(rows);
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public getKeyColor(key: Key): string {
    if (key.code === this.serviceKeys.AltRight) {
      return this.isAltSticking ? this.stickingKeyColor : this.serviceKeyColor;
    }

    if (key.code === this.serviceKeys.ShiftLeft) {
      return this.isShiftSticking ? this.stickingKeyColor : this.serviceKeyColor;
    }

    return this.regularKeyColor;
  }

  public getActiveLabelNumber(key: Key): number {
    if (this.serviceKeys.AltRight === key.code || this.serviceKeys.ShiftLeft === key.code) {
      return 0;
    }
    if (this.isShiftSticking && this.isAltSticking) {
      return 3;
    }
    if (this.isShiftSticking) {
      return 1;
    }
    if (this.isAltSticking) {
      return 2;
    }

    return 0;
  }

  public handleKey(key: Key): void {
    switch (key.code) {
      case this.serviceKeys.ShiftLeft:
        this.isShiftSticking = !this.isShiftSticking;
        break;
      case this.serviceKeys.AltRight:
        this.isAltSticking = !this.isAltSticking;
        break;
      default:
        const isServiceKey = Object.values(this.serviceKeys).find(val => val === key.code);
        if (isServiceKey) {
          this.sendKey(key.code);
        } else {
          const label = this.getProperKeyLabel(key);
          this.sendKey(label);
        }
    }
  }

  private initSubscribers(): void {
    const keyDown = this
      .keyboardService
      .keydown
      .subscribe(this.onKeyDownEvent.bind(this));

    this.subscriptions.push(keyDown);
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getProperKeyLabel(key: Key): string {
    /**
     * If no sticking, then 0 index label
     * If Shift sticking, then 1 index label
     * If Alt sticking, then 2 index label
     * If Shift + Alt sticking, then 3 index label 
     */
    if (this.isShiftSticking && this.isAltSticking) {
      return key.labels[3];
    }
    if (this.isShiftSticking) {
      return key.labels[1];
    }
    if (this.isAltSticking) {
      return key.labels[2]
    }

    return key.labels[0];
  }

  private sendKey(keyLabel: string): void {
    this.onKey.emit(keyLabel);
  }

  private generateRows(): KeyboardRow[] {
    return this.layoutData.keyRows.map(row => {
      return {
        keys: row.map(key => {
          return {
            code: key.code,
            labels: key.keys
          };
        })
      };
    });
  }

  private extendLayoutData(layoutData: KeyboardRow[]): KeyboardRow[] {
    return layoutData.map((row, index) => {
      if (index === 3) {
        return this.isMobileView
          ? {
            keys: [
              this.getServiceKey(this.serviceKeys.ShiftLeft, ['⇧']),
              ...row.keys,
            ]
          }
          : {
            keys: [
              this.getServiceKey(this.serviceKeys.ShiftLeft, ['⇧']),
              ...row.keys,
              this.getServiceKey(this.serviceKeys.AltRight, [
                this.osType === SupportedOS.MacOS
                  ? '⌥'
                  : 'alt'
              ])
            ]
          };
      }

      return {
        keys: [...row.keys]
      };
    });
  }

  private getServiceKey(code: string, labels: string[]): Key {
    return {
      code,
      labels
    };
  }

  private onKeyDownEvent(code: string): void {
    const shift = /shift/i.test(code);
    const alt = /alt/i.test(code);

    if (shift) {
      this.handleKey(this.rows[3].keys[0]);
    }

    if (alt) {
      this.handleKey(this.rows[3].keys[this.rows[3].keys.length - 1]);
    }
  }
}
