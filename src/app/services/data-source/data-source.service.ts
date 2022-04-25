import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AvailableLayout } from 'src/app/services/data-source/types/available-layout.interface';
import { LayoutData } from './types/layout-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  public getAvailableLayouts(): Promise<AvailableLayout[]> {
    return lastValueFrom(this
      .http
      .get<AvailableLayout[]>('./assets/data/available-layouts.json')
    );
  }

  public getLayout(layoutCode: string): Promise<LayoutData> {
    return lastValueFrom(this
      .http
      .get<LayoutData>(`./assets/data/layouts/${layoutCode}.json`)
    );
  }

  public getMiniLayout(layoutCode: string): Promise<LayoutData> {
    return lastValueFrom(this
      .http
      .get<LayoutData>(`./assets/data/layouts/${layoutCode}-mini.json`)
    );
  }
}
