import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Key } from './types/key.interface';
import { SERVICE_KEYS } from 'src/app/constants/service-keys.constant';
import { ColorHelperService } from 'src/app/services/color-helper/color-helper.service';
import { KeyboardService } from 'src/app/services/keyboard/keyboard.service';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() key: Key = {
    code: '',
    labels: []
  };
  @Input() activeLabelNumber = 0;
  @Input() color = '#FFFFFF';
  @Input() width = 1;

  @Output() clicked = new EventEmitter<Key>();

  @ViewChild('keyComponent') keyComponent: any;
  
  private lightKey = '#FFFFFF';
  private darkKey = '#000000';
  private greyKey = '#CCCCCC';
  private subscription: Subscription | undefined;
  
  public keyColor = this.darkKey;

  constructor(
    private colorHelperService: ColorHelperService,
    private keyboardService: KeyboardService
  ) { }

  ngOnInit(): void {
    this.subscription = this.keyboardService.keyDown$.subscribe(event => {
      if (event.code === this.key.code) {
        event.preventDefault();
        this.highlightKey();
        this.clicked.emit(this.key);
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.width !== 1) {
      this.keyComponent.nativeElement.style.width =
        this.keyComponent.nativeElement.clientWidth * this.width + 'px';
    }
  }

  ngOnChanges(): void {
    this.keyColor = this.getKeyColor();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5
      ? this.darkKey
      : this.lightKey;
  }

  private highlightKey(): void {
    if (this.key.code === SERVICE_KEYS.AltRight || this.key.code === SERVICE_KEYS.ShiftLeft) {
      return;
    }

    const previousColor = this.color;
    this.color = this.darkKey;

    setTimeout(() => {
      this.color = previousColor;
    }, 75);
  }
}
