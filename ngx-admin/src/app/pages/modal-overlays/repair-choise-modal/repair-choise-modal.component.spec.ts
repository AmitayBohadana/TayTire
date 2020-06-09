import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairChoiseModalComponent } from './repair-choise-modal.component';

describe('RepairChoiseModalComponent', () => {
  let component: RepairChoiseModalComponent;
  let fixture: ComponentFixture<RepairChoiseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairChoiseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairChoiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
