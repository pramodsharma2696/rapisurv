import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkerAddLocalWorkerModalComponent } from './manage-worker-add-local-worker-modal.component';

describe('ManageWorkerAddLocalWorkerModalComponent', () => {
  let component: ManageWorkerAddLocalWorkerModalComponent;
  let fixture: ComponentFixture<ManageWorkerAddLocalWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWorkerAddLocalWorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkerAddLocalWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
