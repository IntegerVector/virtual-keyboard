import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextFieldComponent } from './text-field/text-field.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    TextFieldComponent,
    DropDownComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TextFieldComponent,
    DropDownComponent,
    ButtonComponent
  ]
})
export class UiElementsModule { }
