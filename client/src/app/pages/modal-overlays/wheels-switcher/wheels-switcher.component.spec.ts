import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelsSwitcherComponent } from './wheels-switcher.component';

describe('WheelsSwitcherComponent', () => {
  let component: WheelsSwitcherComponent;
  let fixture: ComponentFixture<WheelsSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelsSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelsSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
