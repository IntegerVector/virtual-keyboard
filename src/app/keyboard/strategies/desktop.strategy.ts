import { SERVICE_KEYS } from 'src/app/constants/service-keys.constant';
import { BaseKeyboardStrategy } from 'src/app/keyboard/strategies/base-keyboard.strategy';
import { KeyboardRow } from 'src/app/keyboard/types/keyboard-row.interface';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { SupportedOS } from 'src/app/services/user-agent/types/supported-os.enum';

export class DesktopStrategy extends BaseKeyboardStrategy {
  constructor(private osType: SupportedOS) {
    super();
  }
  public extendRowsData(layoutData: LayoutData): KeyboardRow[] {
    const rows = super.extendRowsData(layoutData);

    const secondRowKeysExtended = [
      this.getServiceKey(SERVICE_KEYS.Tab, ['tab']),
      ...rows[1].keys
    ];
    const thirdRowKeysExtended = [
      ...rows[2].keys,
      this.getServiceKey(SERVICE_KEYS.Enter, ['⏎'])
    ];

    return [
      { keys: rows[0].keys },
      { keys: secondRowKeysExtended },
      { keys: thirdRowKeysExtended },
      { keys: rows[3].keys },
      {
        keys: [
          this.getServiceKey(SERVICE_KEYS.ShiftLeft, ['⇧']),
          this.getServiceKey(SERVICE_KEYS.Space, [' ']),
          this.getServiceKey(SERVICE_KEYS.AltRight, [
            this.osType === SupportedOS.MacOS
              ? '⌥'
              : 'alt'
          ])
        ]
      }
    ];
  }
}
