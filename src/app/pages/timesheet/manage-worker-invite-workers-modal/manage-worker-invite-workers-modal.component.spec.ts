import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkerInviteWorkersModalComponent } from './manage-worker-invite-workers-modal.component';

describe('ManageWorkerInviteWorkersModalComponent', () => {
  let component: ManageWorkerInviteWorkersModalComponent;
  let fixture: ComponentFixture<ManageWorkerInviteWorkersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWorkerInviteWorkersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkerInviteWorkersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
