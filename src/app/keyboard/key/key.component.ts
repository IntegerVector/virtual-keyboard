import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Key } from './types/key.interface';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {
  @Input()key: Key = {
    code: '',
    labels: [],
    activeLabelNumber: 0,
    sticking: false,
    highlighted: false
  };

  @Output() clicked = new EventEmitter<Key>();

  public getButtonClasses(): string {
    const isHighlighted = this.key.highlighted ? 'key-container--highlighted' : '';
    const isActive = this.key.sticking ? 'key-container--sticking' : '';

    return `${isHighlighted} ${isActive}`;
  }

  public getLabelClasses(labelNumber: number): string {
    return labelNumber === this.key.activeLabelNumber
      ? 'label label--active'
      : 'label'
  }
}
