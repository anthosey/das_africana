import { TestBed } from '@angular/core/testing';

import { DataExService } from './data-ex.service';

describe('DataExService', () => {
  let service: DataExService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
