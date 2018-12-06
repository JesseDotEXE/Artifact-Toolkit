import { TestBed } from '@angular/core/testing';

import { MatchTrackerService } from './match-tracker.service';

describe('MatchTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchTrackerService = TestBed.get(MatchTrackerService);
    expect(service).toBeTruthy();
  });
});
