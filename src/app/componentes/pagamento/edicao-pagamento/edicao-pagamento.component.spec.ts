import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoPagamentoComponent } from './edicao-pagamento.component';

describe('EdicaoPagamentoComponent', () => {
  let component: EdicaoPagamentoComponent;
  let fixture: ComponentFixture<EdicaoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
