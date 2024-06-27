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
  selected_worker = []
  uni_worker_data = []
  pending_invites = []
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
      this.timesheetService.getAllPendingInvite(this.timesheetdata.timesheet_id).subscribe(res => {
        this.pending_invites = res.data
      }, err => {
        console.log(err)
      })
      this.timesheetService.getAllUniversalWorker(this.timesheetdata.timesheet_id).subscribe(res => {
        const data = res.data;
        this.uni_worker_data = data.map((worker) => {
          worker.fullname = `${worker.worker_id} - ${worker.firstname} ${worker.lastname}`;
          return worker;
        })
      }, err => {
        console.log(err)
      })
    })




  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  removeWorker(index) {
    this.selected_worker.splice(index, 1);
  }

  addLocalWorker(): void {
    // Fetch the timesheet data to determine if local worker addition is enabled
    this.timesheetService.getTimesheetById(this.timesheetidmain).subscribe(res => {
      this.timesheetdata = res.data;
      this.isLocalWorker = this.timesheetdata.localwork === '1'; // Update isLocalWorker based on timesheet data
      // Check if local worker addition is enabled
      if (this.isLocalWorker) {
        // Close any open modals
        this.activeModal.close({ data: {}, status: 200 });
        // Open the modal for adding local worker
        const activeModal = this.modalService.open(ManageWorkerAddLocalWorkerModalComponent, {
          size: 'md',
          container: 'nb-layout',
          centered: true,
        });
        // Pass necessary data to the modal
        activeModal.componentInstance.timesheetid = this.timesheetdata?.timesheet_id;
        activeModal.componentInstance.fetchWorkerData = this.fetchWorkerData;
      } else {
        // Show a warning if local worker addition is not enabled
        this.toastrService.warning('Add local worker is not enabled.', 'Warning', {
          duration: 3000,
        });
      }
    });
  }

  inviteWorkers() {
    try {
      console.log(this.selected_worker)
      this.selected_worker.forEach((worker) => {
        this.timesheetService.inviteWorker(worker.worker_id, this.timesheetdata.timesheet_id).subscribe(res => {
          console.log(res)
        })
      })

      this.activeModal.close({});
      this.toastrService.success('Invitation Successfully Sent.', 'Success', {
        duration: 3000,
      })
    } catch {
      this.activeModal.close({});
      this.toastrService.warning('Invitation Failed.', 'Error', {
        duration: 3000,
      })
    }

  }

  removeInvite(worker) {
    console.log(worker);
    this.timesheetService.deleteInvite(worker.id).subscribe(res => {
      console.log(res)
      if (res.type == 'success') {
        this.toastrService.success('Invitation Successfully removed.', 'Success', {
          duration: 3000,
        })
        this.timesheetService.getAllPendingInvite(this.timesheetdata.timesheet_id).subscribe(res => {
          this.pending_invites = res.data
        }, err => {
          console.log(err)
        })
        this.timesheetService.getAllUniversalWorker(this.timesheetdata.timesheet_id).subscribe(res => {
          const data = res.data;
          this.uni_worker_data = data.map((worker) => {
            worker.fullname = `${worker.worker_id} - ${worker.firstname} ${worker.lastname}`;
            return worker;
          })
        }, err => {
          console.log(err)
        })
      }
    })

  }
}
