import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPagamentoComponent } from './cadastrar-pagamento.component';

describe('CadastrarPagamentoComponent', () => {
  let component: CadastrarPagamentoComponent;
  let fixture: ComponentFixture<CadastrarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
