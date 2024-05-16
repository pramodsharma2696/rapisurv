import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMyTimeCalendarComponent } from './enter-my-time-calendar.component';

describe('EnterMyTimeCalendarComponent', () => {
  let component: EnterMyTimeCalendarComponent;
  let fixture: ComponentFixture<EnterMyTimeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterMyTimeCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterMyTimeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
