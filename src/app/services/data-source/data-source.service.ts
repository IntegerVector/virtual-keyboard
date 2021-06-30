import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LayoutData } from './types/layout-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  public getLayout(layoutCode: string): Promise<LayoutData> {
    return this
      .http
      .get<LayoutData>(`./assets/data/layouts/${layoutCode}.json`)
      .toPromise();
  }
}
