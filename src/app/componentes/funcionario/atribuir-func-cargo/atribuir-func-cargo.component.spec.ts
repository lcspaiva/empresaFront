import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirFuncCargoComponent } from './atribuir-func-cargo.component';

describe('AtribuirFuncCargoComponent', () => {
  let component: AtribuirFuncCargoComponent;
  let fixture: ComponentFixture<AtribuirFuncCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtribuirFuncCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirFuncCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
