import { TestBed } from '@angular/core/testing';

import { GameRecordService } from './game-record.service';

describe('GameRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameRecordService = TestBed.get(GameRecordService);
    expect(service).toBeTruthy();
  });
});
