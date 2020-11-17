import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiresStepperComponent } from './tires-stepper.component';

describe('TiresStepperComponent', () => {
  let component: TiresStepperComponent;
  let fixture: ComponentFixture<TiresStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiresStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiresStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
