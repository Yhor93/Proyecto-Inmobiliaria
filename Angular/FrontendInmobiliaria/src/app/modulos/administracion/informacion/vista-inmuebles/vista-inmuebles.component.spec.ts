import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaInmueblesComponent } from './vista-inmuebles.component';

describe('VistaInmueblesComponent', () => {
  let component: VistaInmueblesComponent;
  let fixture: ComponentFixture<VistaInmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaInmueblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
