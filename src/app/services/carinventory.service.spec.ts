import { TestBed } from '@angular/core/testing';

import { CarinventoryService } from './carinventory.service';

describe('CarinventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarinventoryService = TestBed.get(CarinventoryService);
    expect(service).toBeTruthy();
  });
});
