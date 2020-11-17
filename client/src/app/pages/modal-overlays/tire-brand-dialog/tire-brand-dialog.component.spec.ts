import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TireBrandDialogComponent } from './tire-brand-dialog.component';

describe('TireBrandDialogComponent', () => {
  let component: TireBrandDialogComponent;
  let fixture: ComponentFixture<TireBrandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TireBrandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TireBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
