import { TestBed } from '@angular/core/testing';

import { ScanLogsService } from './scan-logs.service';

describe('ScanLogsService', () => {
  let service: ScanLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
