import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ScreenSizeHelperService } from 'src/app/services/screen-size-helper/screen-size-helper.service';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { Option } from 'src/app/ui-elements/drop-down/types/option.interface';
import { ScreenSize } from 'src/app/services/screen-size-helper/types/screen-size.interface';
import { KeyboardService } from 'src/app/services/keyboard/keyboard.service';
import { SERVICE_KEYS } from 'src/app/constants/service-keys.constant';
import { TextFieldComponent } from 'src/app/ui-elements/text-field/text-field.component';
import { DropDownComponent } from 'src/app/ui-elements/drop-down/drop-down.component';
import { ButtonComponent } from 'src/app/ui-elements/button/button.component';
import { KeyboardComponent } from 'src/app/keyboard/keyboard.component';
import { CommonModule } from '@angular/common';

enum KeyboardSize {
  Full,
  Mini
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DropDownComponent, TextFieldComponent, ButtonComponent, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public layoutData: LayoutData | null = null;
  public text = '';
  public selectedLayout = 'ua';
  public availableLayouts: Option[] = [];
  public isMobileView = false;
  public selectionStart?: number;
  public selectionEnd?: number;

  private subscriptions: Subscription[] = [];
  private keyboardSize = KeyboardSize.Mini;
  private textFieldFocused = false;

  constructor(
    private dataSource: DataSourceService,
    private ls: LocalStorageService,
    private screenSizeHelper: ScreenSizeHelperService,
    private clipboardService: ClipboardService,
    private keyboardService: KeyboardService
  ) { }

  async ngOnInit(): Promise<void> {
    const appConfigs = this.ls.getConfigs();
    if (appConfigs) {
      this.selectedLayout = appConfigs?.selectedLayout || 'ua';
      this.text = appConfigs?.text || '';
      this.selectionStart = this.text.length;
    }

    this.initSubscribers();

    this.availableLayouts = await this.dataSource.getAvailableLayouts();
    this.layoutData = await this.getLayout();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public setText(text: string): void {
    this.text = text;
    this.ls.saveConfigs({
      text,
      selectedLayout: this.selectedLayout
    });
  }

  public async onLayoutSelected(layoutId: string): Promise<void> {
    this.selectedLayout = layoutId;
    this.layoutData = await this.getLayout();

    this.ls.saveConfigs({
      selectedLayout: layoutId,
      text: this.text
    });
  }

  public onTextFieldFocusChange(focusState: boolean): void {
    this.textFieldFocused = focusState;
  }

  public onSelectionChange({ selectionStart, selectionEnd }: { selectionStart: number; selectionEnd: number }): void {
    this.selectionStart = selectionStart;
    this.selectionEnd = selectionEnd;
  }

  public onKeyPressed(key: string) {
    if (this.textFieldFocused) {
      this.selectionStart = this.selectionStart || this.text.length;
      this.selectionEnd = this.selectionEnd || this.text.length;

      const length = this.selectionEnd - this.selectionStart;
      const charArray = this.text.split('');
      charArray.splice(this.selectionStart, length, key);
      this.setText(charArray.join(''));
      this.selectionStart += 1;
    } else {
      this.setText(this.text + key);
    }
  }

  public onDeleteKey(): void {
    const newText = this.text.slice(0, this.text.length - 1);
    this.setText(newText);
  }

  public onDeleteAll(): void {
    this.setText('');
  }

  public onCopy(): void {
    this.clipboardService.copyToClipboard(this.text);
  }

  private async getLayout(): Promise<LayoutData> {
    return this.keyboardSize === KeyboardSize.Full
      ? this.dataSource.getLayout(this.selectedLayout)
      : this.dataSource.getMiniLayout(this.selectedLayout);
  }

  private initSubscribers(): void {
    const screenSizeSubscriber = this
      .screenSizeHelper
      .sizeChanged
      .subscribe(this.onScreenSizeChanged.bind(this));
    const keyboardSubscriber = this
      .keyboardService
      .keyDown$
      .subscribe(event => {
        if (event.code === SERVICE_KEYS.Backspace) {
          if (!this.textFieldFocused) {
            this.onDeleteKey();
            event.preventDefault();
          }
          if (this.selectionStart && this.selectionStart > 0) {
            this.selectionStart -= 1;
          }
        }
        if (event.code === SERVICE_KEYS.Delete) {
          this.onDeleteAll();
          event.preventDefault();
        }
      });

    this.subscriptions.push(
      screenSizeSubscriber,
      keyboardSubscriber
    );
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private async onScreenSizeChanged(size: ScreenSize): Promise<void> {
    if (size.width <= 800) {
      this.isMobileView = true;
      this.keyboardSize = KeyboardSize.Mini;
    } else {
      this.isMobileView = false;
      this.keyboardSize = KeyboardSize.Full;
    }

    this.layoutData = await this.getLayout();
  }
}
