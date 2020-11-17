import { TestBed } from '@angular/core/testing';

import { ReportInputService } from './report-input.service';

describe('ReportInputService', () => {
  let service: ReportInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
