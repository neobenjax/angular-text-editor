import { TestBed, inject } from '@angular/core/testing';

import { EditableBlocksService } from './editable-blocks.service';

describe('EditableBlocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditableBlocksService]
    });
  });

  it('should be created', inject([EditableBlocksService], (service: EditableBlocksService) => {
    expect(service).toBeTruthy();
  }));
});
