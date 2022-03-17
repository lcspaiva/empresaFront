import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSupervisorComponent } from './editar-supervisor.component';

describe('EditarSupervisorComponent', () => {
  let component: EditarSupervisorComponent;
  let fixture: ComponentFixture<EditarSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
