import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ScreenSizeHelperService } from 'src/app/services/screen-size-helper/screen-size-helper.service';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { Option } from 'src/app/ui-elements/drop-down/types/option.interface';
import { ScreenSize } from 'src/app/services/screen-size-helper/types/screen-size.interface';

enum KeyboardSize {
  Full,
  Mini
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public layoutData: LayoutData | null = null;
  public text = '';
  public selectedLayout = 'ua';
  public availableLayouts: Option[] = [];

  private subscriptions: Subscription[] = [];
  private keyboardSize = KeyboardSize.Mini;

  constructor(
    private dataSource: DataSourceService,
    private ls: LocalStorageService,
    private screenSizeHelper: ScreenSizeHelperService
  ) { }

  async ngOnInit(): Promise<void> {
    const appConfigs = this.ls.getConfigs();
    if (appConfigs) {
      this.selectedLayout = appConfigs?.selectedLayout || 'ua';
      this.text = appConfigs?.text || '';
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

    this.subscriptions.push(screenSizeSubscriber);
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private async onScreenSizeChanged(size: ScreenSize): Promise<void> {
    if (size.width <= 600 || size.height <= 600) {
      this.keyboardSize = KeyboardSize.Mini;
    } else {
      this.keyboardSize = KeyboardSize.Full;
    }

    this.layoutData = await this.getLayout();
    console.log(this.layoutData);
  }
}
