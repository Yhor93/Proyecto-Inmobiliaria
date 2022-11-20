import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesComercialesComponent } from './locales-comerciales.component';

describe('LocalesComercialesComponent', () => {
  let component: LocalesComercialesComponent;
  let fixture: ComponentFixture<LocalesComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalesComercialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalesComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
