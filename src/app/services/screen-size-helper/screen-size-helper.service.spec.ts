import { TestBed } from '@angular/core/testing';

import { ScreenSizeHelperService } from './screen-size-helper.service';

describe('ScreenSizeHelperService', () => {
  let service: ScreenSizeHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
