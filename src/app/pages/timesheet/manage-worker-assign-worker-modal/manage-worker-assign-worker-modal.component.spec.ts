import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkerAssignWorkerModalComponent } from './manage-worker-assign-worker-modal.component';

describe('ManageWorkerAssignWorkerModalComponent', () => {
  let component: ManageWorkerAssignWorkerModalComponent;
  let fixture: ComponentFixture<ManageWorkerAssignWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWorkerAssignWorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkerAssignWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
