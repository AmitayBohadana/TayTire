import { TestBed } from '@angular/core/testing';

import { RepairTypesService } from './repair-types.service';

describe('RepairTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairTypesService = TestBed.get(RepairTypesService);
    expect(service).toBeTruthy();
  });
});
