import { TestBed, inject } from '@angular/core/testing';

import { MatchdataService } from './matchdata.service';

describe('MatchdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchdataService]
    });
  });

  it('should be created', inject([MatchdataService], (service: MatchdataService) => {
    expect(service).toBeTruthy();
  }));
});
