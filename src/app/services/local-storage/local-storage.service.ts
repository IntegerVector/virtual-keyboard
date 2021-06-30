import { Injectable } from '@angular/core';

import { Configs } from 'src/app/services/local-storage/types/configs.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage;
  private itemName = 'vkeyboard:appconfigs';

  constructor() {
    if (localStorage) {
      this.localStorage = localStorage;
    }
  }

  public saveConfigs(conf: Configs): void {
    if (this.localStorage) {
      try {
        this.localStorage.setItem(this.itemName, JSON.stringify(conf));
      } catch (e) {
        // we will ignore this problem to not break rest of application
      }
    }
  }

  public getConfigs(): Configs | null {
    if (this.localStorage) {
      const stringConf = this.localStorage.getItem(this.itemName);
      if (stringConf) {
        try {
          const appConfiguration =  JSON.parse(stringConf);
          return appConfiguration
        } catch (e) {
          return null;
        }
      }
    }

    return null;
  }
}
