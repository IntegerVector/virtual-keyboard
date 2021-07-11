import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { KeyboardRow } from './types/keyboard-row.interface';
import { AdditionalKey } from './types/additional-key.interface';
import { Key } from '../key/types/key.interface';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnChanges {
  @Input()
  layoutData!: LayoutData;

  public additionalKeys: AdditionalKey[] = [];
  public rows: KeyboardRow[] = [];

  private isShiftSticking = false;
  private isAltSticking = false;
  private serviceKeys = {
    ShiftLeft: 'ShiftLeft',
    AltRight: 'AltRight'
  };

  @Output() onKey = new EventEmitter<string>();

  public ngOnChanges(): void {
    const rows = this.generateRows();
    this.rows = this.extendLayoutData(rows);
    this.additionalKeys = this.generateAdditionalKeys();
  }

  public getProperKeyLabel(key: Key): string {
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

  public handleKey(key: Key, index: number): void {
    switch (key.code) {
      case this.serviceKeys.ShiftLeft:
        this.isShiftSticking = !this.isShiftSticking;
        this.toggleSticking(index, this.serviceKeys.ShiftLeft);
        break;
      case this.serviceKeys.AltRight:
        this.isAltSticking = !this.isAltSticking;
        this.toggleSticking(index, this.serviceKeys.AltRight);
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

    this.updateActiveLabelNumber();
  }

  public sendKey(keyLabel: string): void {
    this.onKey.emit(keyLabel);
  }

  private generateRows(): KeyboardRow[] {
    console.log(this.layoutData);
    return this.layoutData.keyRows.map(row => {
      return {
        keys: row.map(key => {
          return {
            code: key.code,
            labels: key.keys,
            highlighted: true,
            sticking: false,
            activeLabelNumber: 0
          };
        })
      };
    });
  }

  private generateAdditionalKeys(): AdditionalKey[] {
    return this.layoutData.specialKeys.map(key => {
      return {
        code: key.code,
        label: key.keys[0]
      };
    });
  }

  private extendLayoutData(layoutData: KeyboardRow[]): KeyboardRow[] {
    return layoutData.map((row, index) => {
      if (index === 3) {
        return {
          keys: [
            this.getServiceKey(this.serviceKeys.ShiftLeft, ['⇧']),
            ...row.keys,
            this.getServiceKey(this.serviceKeys.AltRight, ['alt'])
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
      labels,
      highlighted: false,
      sticking: false,
      activeLabelNumber: 0
    };
  }

  private toggleSticking(index: number, code: string): void {
    const key = this.rows[index].keys.find(key => key.code === code);
    if (key) {
      key.sticking = !key.sticking;
    }
  }

  private updateActiveLabelNumber(): void {
    const activeLabelNumber = this.getActiveLabelNumber();
    this.rows.forEach(row => {
      row.keys.forEach(key => {
        key.activeLabelNumber = activeLabelNumber;
      });
    });
  }

  private getActiveLabelNumber(): number {
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
}
