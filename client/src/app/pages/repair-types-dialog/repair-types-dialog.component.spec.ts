import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTypesDialogComponent } from './repair-types-dialog.component';

describe('RepairTypesDialogComponent', () => {
  let component: RepairTypesDialogComponent;
  let fixture: ComponentFixture<RepairTypesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairTypesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
