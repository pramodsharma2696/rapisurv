import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTableRowComponent } from './attendance-table-row.component';

describe('AttendanceTableRowComponent', () => {
  let component: AttendanceTableRowComponent;
  let fixture: ComponentFixture<AttendanceTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceTableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
