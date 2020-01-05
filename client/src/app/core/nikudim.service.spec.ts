import { TestBed } from '@angular/core/testing';

import { NikudimService } from './nikudim.service';

describe('NikudimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NikudimService = TestBed.get(NikudimService);
    expect(service).toBeTruthy();
  });
});
