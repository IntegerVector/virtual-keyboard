import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  @Input() text: string = '';
  @Output() onChange = new EventEmitter<any>();
  @Output() onFocusChange = new EventEmitter<boolean>();
}
