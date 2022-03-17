import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSupervisorComponent } from './listar-supervisor.component';

describe('ListarSupervisorComponent', () => {
  let component: ListarSupervisorComponent;
  let fixture: ComponentFixture<ListarSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
