import {
  Component,
  Input,
  Output,
  ViewChild,
  OnChanges,
  AfterViewInit,
  EventEmitter,
  ElementRef,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnChanges, AfterViewInit {
  @Input() text: string = '';
  @Input() selectionStart?: number;
  @Output() onChange = new EventEmitter<any>();
  @Output() onFocusChange = new EventEmitter<boolean>();
  @Output() onSelectionChange = new EventEmitter<{ selectionStart: number; selectionEnd: number; }>();

  @ViewChild('textarea', { static: false }) textArea!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.textArea && changes.text) {
      this.setTextAreaValues();

      // Workaround for iOS Safari:
      this.textArea.nativeElement.blur();
    }
  }

  ngAfterViewInit(): void {
    this.setTextAreaValues();
  }

  public onSelection(): void {
    const selectionStart = this.textArea.nativeElement.selectionStart;
    const selectionEnd = this.textArea.nativeElement.selectionEnd;

    this.onSelectionChange.emit({ selectionStart, selectionEnd });
  }

  public onTextAreaChange(): void {
    this.onChange.emit(this.textArea.nativeElement.value || '');
  }

  private setTextAreaValues(): void {
    /**
     * this methos exists, because usual ngModel binding will not work here
     * we need to controll order of values being set, so setting it manualy is best choice
     */
    this.textArea.nativeElement.value = this.text;
    this.textArea.nativeElement.selectionStart = this.selectionStart || this.text.length || 0;
    this.textArea.nativeElement.selectionEnd = this.selectionStart || this.text.length || 0;
  }
}

