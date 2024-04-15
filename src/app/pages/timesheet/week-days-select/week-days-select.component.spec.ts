import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaysSelectComponent } from './week-days-select.component';

describe('WeekDaysSelectComponent', () => {
  let component: WeekDaysSelectComponent;
  let fixture: ComponentFixture<WeekDaysSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekDaysSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekDaysSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
