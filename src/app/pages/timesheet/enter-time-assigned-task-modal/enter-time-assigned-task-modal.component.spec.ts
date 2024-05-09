import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTimeAssignedTaskModalComponent } from './enter-time-assigned-task-modal.component';

describe('EnterTimeAssignedTaskModalComponent', () => {
  let component: EnterTimeAssignedTaskModalComponent;
  let fixture: ComponentFixture<EnterTimeAssignedTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTimeAssignedTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterTimeAssignedTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
