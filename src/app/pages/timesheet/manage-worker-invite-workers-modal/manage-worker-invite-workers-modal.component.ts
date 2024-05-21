import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerAddLocalWorkerModalComponent } from '../manage-worker-add-local-worker-modal/manage-worker-add-local-worker-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-manage-worker-invite-workers-modal',
  templateUrl: './manage-worker-invite-workers-modal.component.html',
  styleUrls: ['./manage-worker-invite-workers-modal.component.scss']
})
export class ManageWorkerInviteWorkersModalComponent implements OnInit {

  @Input() timesheetid;
  @Input() fetchWorkerData;
  @Input() timesheetidmain
  timesheetdata
  isLocalWorker = true
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private timesheetService: TimesheetService,
    private toastrService: NbToastrService


  ) { }

  ngOnInit(): void {
    this.timesheetService.getTimesheetById(this.timesheetidmain).subscribe(res => {
      this.timesheetdata = res.data
      this.isLocalWorker = this.timesheetdata.localwork == '1' ? true : false
      console.log(this.timesheetdata)
      console.log(this.isLocalWorker)
    })
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  addLocalWorker() {
    if (this.isLocalWorker) {
      this.activeModal.close({ data: {}, status: 200 });

      const activeModal = this.modalService.open(ManageWorkerAddLocalWorkerModalComponent, {
        size: 'md',
        container: 'nb-layout',
        centered: true,
      });

      activeModal.componentInstance.timesheetid = this.timesheetid
      activeModal.componentInstance.fetchWorkerData = this.fetchWorkerData
    }
    else {
      this.toastrService.warning('Add local worker is not enabled.', 'Warning', {
        duration: 3000,
      });
    }

  }
}
