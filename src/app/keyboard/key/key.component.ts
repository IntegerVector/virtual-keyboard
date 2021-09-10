import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ColorHelperService } from 'src/app/services/color-helper/color-helper.service';

import { Key } from './types/key.interface';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnChanges {
  @Input() key: Key = {
    code: '',
    labels: []
  };
  @Input() activeLabelNumber = 0;
  @Input() color = '#FFFFFF';

  @Output() clicked = new EventEmitter<Key>();

  private lightKey = '#FFFFFF';
  private darkKey = '#000000';
  private greyKey = '#CCCCCC'

  public keyColor = this.darkKey;

  constructor(private colorHelperService: ColorHelperService) {}

  ngOnChanges(): void {
    this.keyColor = this.getKeyColor();
  }

  public getLabelColor(labelNumber: number): string {
    return labelNumber === this.activeLabelNumber
      ? this.keyColor
      : this.greyKey
  }

  public getLabelClass(labelNumber: number): string {
    return labelNumber === this.activeLabelNumber
      ? 'label label--active'
      : 'label';
  }

  private getKeyColor(): string {
    const { r, g, b } = this.colorHelperService.hexToRgb(this.color);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b)/255;

    return luminance > 0.5
      ? this.darkKey
      : this.lightKey;
  }
}
