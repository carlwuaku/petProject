import { TestBed } from '@angular/core/testing';

import { PetStoreService } from './pet-store.service';

describe('PetStoreService', () => {
  let service: PetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
