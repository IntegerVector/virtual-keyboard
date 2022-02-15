import { Injectable } from '@angular/core';
import { SupportedOS } from 'src/app/services/user-agent/types/supported-os.enum';

@Injectable({
  providedIn: 'root'
})
export class UserAgentService {
  private osMapper = [
    {
      os: SupportedOS.Linux,
      regexp: /(Linux)|(X11)/
    },
    {
      os: SupportedOS.MacOS,
      regexp: /(Mac_PowerPC)|(Macintosh)/
    },
    {
      os: SupportedOS.Windows,
      regexp: /Windows/
    }
  ];

  public getOSName(): SupportedOS {
    const userAgent = navigator.userAgent;
    const pair = this.osMapper.find(
      pair => pair.regexp.test(userAgent)
    );
    return pair ? pair.os : SupportedOS.Other;
  }
}
