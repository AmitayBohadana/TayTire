import { TestBed } from '@angular/core/testing';

import { TireService } from './tire.service';

describe('TireService', () => {
  let service: TireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
