import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAccordionComponent } from './reports-accordion.component';

describe('ReportsAccordionComponent', () => {
  let component: ReportsAccordionComponent;
  let fixture: ComponentFixture<ReportsAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
