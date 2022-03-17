import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFuncionarioCargolessComponent } from './cadastrar-funcionario-cargoless.component';

describe('CadastrarFuncionarioCargolessComponent', () => {
  let component: CadastrarFuncionarioCargolessComponent;
  let fixture: ComponentFixture<CadastrarFuncionarioCargolessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarFuncionarioCargolessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarFuncionarioCargolessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
