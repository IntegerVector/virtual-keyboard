import { TestBed } from '@angular/core/testing';

import { ClipboardService } from './clipboard.service';

describe('ClipboardServiceService', () => {
  let service: ClipboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
