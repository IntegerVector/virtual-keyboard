import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KeyboardModule } from './keyboard/keyboard.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeyboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
