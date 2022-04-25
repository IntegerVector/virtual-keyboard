import { SERVICE_KEYS } from 'src/app/constants/service-keys.constant';
import { BaseKeyboardStrategy } from 'src/app/keyboard/keyboard/strategies/base-keyboard.strategy';
import { KeyboardRow } from 'src/app/keyboard/keyboard/types/keyboard-row.interface';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';

export class MobileStrategy extends BaseKeyboardStrategy {
  constructor() {
    super();
  }

  public extendRowsData(layoutData: LayoutData): KeyboardRow[] {
    const rows = super.extendRowsData(layoutData);

    return [
      { keys: rows[0].keys },
      { keys: rows[1].keys },
      { keys: rows[2].keys },
      { keys: rows[3].keys },
      {
        keys:
          [
            this.getServiceKey(SERVICE_KEYS.ShiftLeft, ['⇧']),
            this.getServiceKey(SERVICE_KEYS.Space, [' ']),
            this.getServiceKey(SERVICE_KEYS.Enter, ['⏎'])
          ]
      }
    ];
  }
}
