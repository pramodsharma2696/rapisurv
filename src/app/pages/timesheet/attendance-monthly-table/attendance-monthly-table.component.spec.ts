import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonthlyTableComponent } from './attendance-monthly-table.component';

describe('AttendanceMonthlyTableComponent', () => {
  let component: AttendanceMonthlyTableComponent;
  let fixture: ComponentFixture<AttendanceMonthlyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceMonthlyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceMonthlyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
