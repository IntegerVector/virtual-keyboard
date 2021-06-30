import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';
import { KeyboardModule } from './keyboard/keyboard.module';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { DataSourceService } from './services/data-source/data-source.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiElementsModule,
    KeyboardModule
  ],
  providers: [
    DataSourceService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
