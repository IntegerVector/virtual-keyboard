import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { KeyboardModule } from './keyboard/keyboard.module';
import { DataSourceService } from './services/data-source/data-source.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeyboardModule
  ],
  providers: [DataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
