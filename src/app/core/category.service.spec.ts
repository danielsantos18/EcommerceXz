import { TestBed } from '@angular/core/testing';

import { CatalogoService } from './category.service';

describe('CatalogoService', () => {
  let service: CatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
