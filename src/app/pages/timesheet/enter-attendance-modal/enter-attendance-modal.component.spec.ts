import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAttendanceModalComponent } from './enter-attendance-modal.component';

describe('EnterAttendanceModalComponent', () => {
  let component: EnterAttendanceModalComponent;
  let fixture: ComponentFixture<EnterAttendanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterAttendanceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterAttendanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
