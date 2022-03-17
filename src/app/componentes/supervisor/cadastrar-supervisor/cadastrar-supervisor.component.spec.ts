import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSupervisorComponent } from './cadastrar-supervisor.component';

describe('CadastrarSupervisorComponent', () => {
  let component: CadastrarSupervisorComponent;
  let fixture: ComponentFixture<CadastrarSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
