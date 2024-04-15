import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceWeeklyTableComponent } from './attendance-weekly-table.component';

describe('AttendanceWeeklyTableComponent', () => {
  let component: AttendanceWeeklyTableComponent;
  let fixture: ComponentFixture<AttendanceWeeklyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceWeeklyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceWeeklyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
