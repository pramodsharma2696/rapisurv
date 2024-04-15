import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWeeklyTableComponent } from './summary-weekly-table.component';

describe('SummaryWeeklyTableComponent', () => {
  let component: SummaryWeeklyTableComponent;
  let fixture: ComponentFixture<SummaryWeeklyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryWeeklyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryWeeklyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
