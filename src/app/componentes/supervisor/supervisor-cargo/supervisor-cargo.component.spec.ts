import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCargoComponent } from './supervisor-cargo.component';

describe('SupervisorCargoComponent', () => {
  let component: SupervisorCargoComponent;
  let fixture: ComponentFixture<SupervisorCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
