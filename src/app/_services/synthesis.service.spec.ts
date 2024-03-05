import { TestBed } from '@angular/core/testing';

import { SynthesisService } from './synthesis.service';

describe('SynthesisService', () => {
  let service: SynthesisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynthesisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
