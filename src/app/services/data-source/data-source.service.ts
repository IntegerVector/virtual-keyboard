import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AvailableLayout } from 'src/app/services/data-source/types/available-layout.interface';
import { LayoutData } from './types/layout-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  public getAvailableLayouts(): Promise<AvailableLayout[]> {
    return this
      .http
      .get<AvailableLayout[]>('./assets/data/available-layouts.json')
      .toPromise();
  }

  public getLayout(layoutCode: string): Promise<LayoutData> {
    console.log('full');
    return this
      .http
      .get<LayoutData>(`./assets/data/layouts/${layoutCode}.json`)
      .toPromise();
  }

  public getMiniLayout(layoutCode: string): Promise<LayoutData> {
    console.log('mini');
    return this
      .http
      .get<LayoutData>(`./assets/data/layouts/${layoutCode}-mini.json`)
      .toPromise();
  }
}
