import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGeralFuncionariosComponent } from './lista-geral-funcionarios.component';

describe('ListaGeralFuncionariosComponent', () => {
  let component: ListaGeralFuncionariosComponent;
  let fixture: ComponentFixture<ListaGeralFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGeralFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGeralFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
