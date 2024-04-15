import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMonthlyTableComponent } from './summary-monthly-table.component';

describe('SummaryMonthlyTableComponent', () => {
  let component: SummaryMonthlyTableComponent;
  let fixture: ComponentFixture<SummaryMonthlyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryMonthlyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryMonthlyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
