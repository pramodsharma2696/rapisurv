import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-manage-worker-add-local-worker-modal',
  templateUrl: './manage-worker-add-local-worker-modal.component.html',
  styleUrls: ['./manage-worker-add-local-worker-modal.component.scss']
})
export class ManageWorkerAddLocalWorkerModalComponent implements OnInit {

  @Input() timesheetid;
  @Input() fetchWorkerData;

  localworkers;
  first_name: string;
  last_name: string;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router,
    private timesheetService: TimesheetService,
    private toastrService: NbToastrService

  ) { }


  ngOnInit(): void {
    this.localworkers = [];
    console.log(this.timesheetid)
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }


  inviteWorker() {
    console.log("Invite clicked")
    this.activeModal.close({ data: {}, status: 200 });

    const activeModal = this.modalService.open(ManageWorkerInviteWorkersModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });
  }


  addWorker() {
    let worker = {
      timesheet_id: this.timesheetid,
      first_name: this.first_name,
      last_name: this.last_name
    }

    this.localworkers = [...this.localworkers, worker];
    console.log(this.localworkers)
    this.first_name = '';
    this.last_name = ''
  }

  removeWorker(index) {
    this.localworkers.splice(index, 1);
  }

  submitLocalWorker() {
    // createLocalWorker
    this.timesheetService.createLocalWorker(this.localworkers).subscribe(res => {
      console.log(res)
      if (res.type == 'success') {
        this.activeModal.close({});
        this.fetchWorkerData()
      }
    },
      error => {
        console.error('An error occurred:', error);
        this.toastrService.warning('Unable to add worker.', 'Error', {
          duration: 3000,
        });
      }
    )
  }
}

