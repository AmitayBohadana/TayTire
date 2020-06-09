import { TestBed } from '@angular/core/testing';

import { TireServiceService } from './tire-service.service';

describe('TireServiceService', () => {
  let service: TireServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TireServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
