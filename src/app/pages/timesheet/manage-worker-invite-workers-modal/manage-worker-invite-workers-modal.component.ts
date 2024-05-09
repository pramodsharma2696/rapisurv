import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerAddLocalWorkerModalComponent } from '../manage-worker-add-local-worker-modal/manage-worker-add-local-worker-modal.component';

@Component({
  selector: 'app-manage-worker-invite-workers-modal',
  templateUrl: './manage-worker-invite-workers-modal.component.html',
  styleUrls: ['./manage-worker-invite-workers-modal.component.scss']
})
export class ManageWorkerInviteWorkersModalComponent implements OnInit {

  @Input() timesheetid;
  @Input() fetchWorkerData;
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  addLocalWorker() {
    this.activeModal.close({ data:  {}, status: 200 });

    const activeModal = this.modalService.open(ManageWorkerAddLocalWorkerModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
    });

    activeModal.componentInstance.timesheetid = this.timesheetid
    activeModal.componentInstance.fetchWorkerData = this.fetchWorkerData

  }
}
