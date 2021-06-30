import { Component, OnInit } from '@angular/core';

import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';
import { Option } from 'src/app/ui-elements/drop-down/types/option.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public layoutData: LayoutData | null = null;
  public text = '';
  public selectedLayout = 'ua';
  public availableLayouts: Option[] = [];

  constructor(
    private dataSource: DataSourceService,
    private ls: LocalStorageService
  ) { }

  async ngOnInit(): Promise<void> {
    const appConfigs = this.ls.getConfigs();
    if (appConfigs) {
      this.selectedLayout = appConfigs?.selectedLayout || 'ua';
      this.text = appConfigs?.text || '';
    }

    this.availableLayouts = await this.dataSource.getAvailableLayouts();
    this.layoutData = await this.dataSource.getLayout(this.selectedLayout);
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
    this.layoutData = await this.dataSource.getLayout(layoutId);

    this.ls.saveConfigs({
      selectedLayout: layoutId,
      text: this.text
    });
  }
}
