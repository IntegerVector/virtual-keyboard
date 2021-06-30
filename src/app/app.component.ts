import { Component, OnInit } from '@angular/core';

import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { LayoutData } from 'src/app/services/data-source/types/layout-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public layoutData: LayoutData | null = null;

  constructor(private dataSource: DataSourceService) { }

  async ngOnInit(): Promise<void> {
    this.layoutData = await this.dataSource.getLayout('de');
  }
  
  public test(t: string) {
    console.log(t);
  }
}
