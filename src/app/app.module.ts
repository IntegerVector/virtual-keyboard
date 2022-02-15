import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';
import { KeyboardModule } from './keyboard/keyboard.module';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { DataSourceService } from './services/data-source/data-source.service';
import { ScreenSizeHelperService } from './services/screen-size-helper/screen-size-helper.service';
import { ColorHelperService } from 'src/app/services/color-helper/color-helper.service';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { KeyboardService } from 'src/app/services/keyboard/keyboard.service';
import { AppComponent } from './app.component';
import { UserAgentService } from 'src/app/services/user-agent/user-agent.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiElementsModule,
    KeyboardModule
  ],
  providers: [
    DataSourceService,
    LocalStorageService,
    ScreenSizeHelperService,
    ColorHelperService,
    ClipboardService,
    KeyboardService,
    UserAgentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
