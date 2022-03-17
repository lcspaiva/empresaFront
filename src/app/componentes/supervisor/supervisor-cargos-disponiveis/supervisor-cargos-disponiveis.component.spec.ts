import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCargosDisponiveisComponent } from './supervisor-cargos-disponiveis.component';

describe('SupervisorCargosDisponiveisComponent', () => {
  let component: SupervisorCargosDisponiveisComponent;
  let fixture: ComponentFixture<SupervisorCargosDisponiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorCargosDisponiveisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorCargosDisponiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
