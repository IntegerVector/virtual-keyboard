import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Option } from 'src/app/ui-elements/drop-down/types/option.interface';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  @Input() options: Option[] = [];
  @Input() selected!: string;
  @Output() onSelect = new EventEmitter<string>();
}
