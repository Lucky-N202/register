import { TestBed } from '@angular/core/testing';

import { ReactivateService } from './reactivate.service';

describe('ReactivateService', () => {
  let service: ReactivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
