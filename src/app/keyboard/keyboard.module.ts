import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './key/key.component';
import { KeyboardComponent } from './keyboard/keyboard.component';



@NgModule({
  declarations: [
    KeyComponent,
    KeyboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeyboardComponent
  ]
})
export class KeyboardModule { }
