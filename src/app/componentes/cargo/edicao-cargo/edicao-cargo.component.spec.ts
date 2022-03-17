import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCargoComponent } from './edicao-cargo.component';

describe('EdicaoCargoComponent', () => {
  let component: EdicaoCargoComponent;
  let fixture: ComponentFixture<EdicaoCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
