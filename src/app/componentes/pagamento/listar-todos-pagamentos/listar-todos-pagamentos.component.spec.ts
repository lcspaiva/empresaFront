import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosPagamentosComponent } from './listar-todos-pagamentos.component';

describe('ListarTodosPagamentosComponent', () => {
  let component: ListarTodosPagamentosComponent;
  let fixture: ComponentFixture<ListarTodosPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTodosPagamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTodosPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
