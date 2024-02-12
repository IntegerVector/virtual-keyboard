import { Key } from 'src/app/keyboard/key/types/key.interface';
import { REGULAR_KEY_COLOR, SERVICE_KEY_COLOR, STICKING_KEY_COLOR } from 'src/app/keyboard/constants/colors.constant';
import { SERVICE_KEYS } from 'src/app/constants/service-keys.constant';
import { KeyboardRow } from 'src/app/keyboard/types/keyboard-row.interface';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';

export class BaseKeyboardStrategy {
  protected isShiftSticking = false;
  protected isAltSticking = false;

  constructor() {}

  public extendRowsData(layoutData: LayoutData): KeyboardRow[] {
    return this.generateRows(layoutData);
  }

  public handleKey(key: Key): string | null {
    switch (key.code) {
      case SERVICE_KEYS.ShiftLeft:
        this.isShiftSticking = !this.isShiftSticking;
        return null;
      case SERVICE_KEYS.AltRight:
        this.isAltSticking = !this.isAltSticking;
        return null;
      default:
        const label = this.getProperKeyLabel(key);
        return label;
    }
  }

  public getProperKeyLabel(key: Key): string {
    /**
     * If no sticking, then 0 index label
     * If Shift sticking, then 1 index label
     * If Alt sticking, then 2 index label
     * If Shift + Alt sticking, then 3 index label 
     */
    if (key.code === SERVICE_KEYS.Space) {
      return ' ';
    }
    if (key.code === SERVICE_KEYS.Tab) {
      return '  ';
    }
    if (key.code === SERVICE_KEYS.Enter) {
      return '\n';
    }
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

  public getActiveLabelNumber(key: Key): number {
    if (
      SERVICE_KEYS.AltRight === key.code ||
      SERVICE_KEYS.ShiftLeft === key.code ||
      SERVICE_KEYS.Backspace === key.code ||
      SERVICE_KEYS.Enter === key.code ||
      SERVICE_KEYS.Tab === key.code) {
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

  public getKeyColor(key: Key) {
    if (key.code === SERVICE_KEYS.AltRight) {
      return this.isAltSticking ? STICKING_KEY_COLOR : SERVICE_KEY_COLOR;
    }
    if (key.code === SERVICE_KEYS.ShiftLeft) {
      return this.isShiftSticking ? STICKING_KEY_COLOR : SERVICE_KEY_COLOR;
    }
    if (key.code === SERVICE_KEYS.Backspace ||
        key.code === SERVICE_KEYS.Enter ||
        key.code === SERVICE_KEYS.Tab) {
        return SERVICE_KEY_COLOR;
    }

    return REGULAR_KEY_COLOR;
  }

  protected generateRows(layoutData: LayoutData): KeyboardRow[] {
    return layoutData.keyRows.map(row => {
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

  protected getServiceKey(code: string, labels: string[]): Key {
    return {
      code,
      labels
    };
  }
}
