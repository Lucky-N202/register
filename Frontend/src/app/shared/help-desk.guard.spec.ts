import { TestBed } from '@angular/core/testing';

import { HelpDeskGuard } from './help-desk.guard';

describe('HelpDeskGuard', () => {
  let guard: HelpDeskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HelpDeskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
