import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { NbToastrService } from '@nebular/theme';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-manage-worker-add-local-worker-modal',
  templateUrl: './manage-worker-add-local-worker-modal.component.html',
  styleUrls: ['./manage-worker-add-local-worker-modal.component.scss']
})
export class ManageWorkerAddLocalWorkerModalComponent implements OnInit {

  @Input() timesheetid;
  @Input() fetchWorkerData;
  file = null;

  localworkers;
  first_name: string;
  last_name: string;

  workerdemodata = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Jane', lastName: 'Smith' },
    { firstName: 'Alice', lastName: 'Johnson' }
  ];

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
    console.log(this.localworkers)
    console.log(this.first_name)
    console.log(this.last_name)
    if (this.localworkers.length == 0 && this.first_name == undefined || this.last_name == undefined) {
      this.toastrService.warning('Please add worker data!', 'Warning', {
        duration: 3000,
      });
    } else {
      if (this.first_name != undefined && this.last_name != undefined && this.last_name != '' && this.first_name != '') {
        let worker = {
          timesheet_id: this.timesheetid,
          first_name: this.first_name,
          last_name: this.last_name
        }
        this.localworkers = [...this.localworkers, worker];
        this.first_name = '';
        this.last_name = ''
      }
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

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.file = files[0];
    }
    console.log(this.file)
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  addfileworker() {
    const formData = new FormData();
    formData.append('file', this.file);
    // formData.append('timesheet_id', this.timesheetid)
    this.timesheetService.updateLocalWorkerByFile(this.file, this.timesheetid).subscribe(res => {
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

  downloadTemp() {
    new AngularCsv(this.workerdemodata, 'template', { headers: ['firstname', 'lastname'] })

  }
}

