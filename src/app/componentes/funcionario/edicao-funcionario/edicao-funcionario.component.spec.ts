import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoFuncionarioComponent } from './edicao-funcionario.component';

describe('EdicaoFuncionarioComponent', () => {
  let component: EdicaoFuncionarioComponent;
  let fixture: ComponentFixture<EdicaoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
