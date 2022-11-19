import { TestBed } from '@angular/core/testing';

import { BuscarInmueblesService } from './buscar-inmuebles.service';

describe('BuscarInmueblesService', () => {
  let service: BuscarInmueblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarInmueblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
