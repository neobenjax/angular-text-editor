import { TestBed, inject } from '@angular/core/testing';

import { DocVarsService } from './doc-vars.service';

describe('DocVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocVarsService]
    });
  });

  it('should be created', inject([DocVarsService], (service: DocVarsService) => {
    expect(service).toBeTruthy();
  }));
});
