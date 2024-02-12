import { DesktopStrategy } from 'src/app/keyboard/strategies/desktop.strategy';
import { MobileStrategy } from 'src/app/keyboard/strategies/mobile.strategy';
import { SupportedOS } from 'src/app/services/user-agent/types/supported-os.enum';

export type getStrategyParams = {
  isMobile: boolean,
  osType: SupportedOS,
};

export function getStrategy(params: getStrategyParams) {
  const { isMobile, osType } = params;

  if (isMobile) {
    return new MobileStrategy();
  } else {
    return new DesktopStrategy(osType);
  }
}
