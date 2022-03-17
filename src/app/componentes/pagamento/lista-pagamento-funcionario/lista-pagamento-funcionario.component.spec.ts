import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagamentoFuncionarioComponent } from './lista-pagamento-funcionario.component';

describe('ListaPagamentoFuncionarioComponent', () => {
  let component: ListaPagamentoFuncionarioComponent;
  let fixture: ComponentFixture<ListaPagamentoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPagamentoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPagamentoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
