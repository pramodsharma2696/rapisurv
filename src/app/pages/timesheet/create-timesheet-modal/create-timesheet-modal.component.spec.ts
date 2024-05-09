import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimesheetModalComponent } from './create-timesheet-modal.component';

describe('CreateTimesheetModalComponent', () => {
  let component: CreateTimesheetModalComponent;
  let fixture: ComponentFixture<CreateTimesheetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTimesheetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTimesheetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
