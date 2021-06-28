import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {
  @Input()
  code!: string;
  @Input()
  highlighted!: boolean;
  @Input()
  enabled!: boolean;
  @Input()
  active!: boolean;
  @Input()
  label!: string;
  @Input()
  shiftLabel!: string;
  @Input()
  altLabel!: string;

  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  public getClasses(): string {
    const isHighlighted = this.highlighted ? 'key-container--highlighted' : '';
    const isEnabled = this.enabled ? 'key-container--clickable' : '';
    const isActive = this.active ? 'key-container--activated' : '';

    return `${isHighlighted} ${isEnabled} ${isActive}`;
  }
}
