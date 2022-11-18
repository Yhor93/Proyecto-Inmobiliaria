import { TestBed } from '@angular/core/testing';

import { InvalidarSesionGuard } from './invalidar-sesion.guard';

describe('InvalidarSesionGuard', () => {
  let guard: InvalidarSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvalidarSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
