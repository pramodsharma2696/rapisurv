import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';

// Interface for Worker
export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  status: string;
  plannedHours: number;
}

@Component({
  selector: 'app-manage-worker',
  templateUrl: './manage-worker.component.html',
  styleUrls: ['./manage-worker.component.scss']
})
export class ManageWorkerComponent implements OnInit {
  @Input() timesheetid;
  @Input() timesheet;
  timesheetdata;
  workers;

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours'];

  constructor(
    private modalService: NgbModal,
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    console.log("this.timesheetid worker" + this.timesheetid)
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let id = res?.data.timesheet_id
      console.log("this.timesheetid worker" + JSON.stringify(this.timesheetdata))
      this.timesheetService.getTimesheetLocalWorker(id).subscribe(res => {

        this.workers = res?.data;
        this.dataSource.data = res?.data
      })
    })
  }

  fetchWorkerData() {
    this.timesheetService.getTimesheetLocalWorker(this.timesheetdata.timesheet_id).subscribe(res => {
      console.log("Worker")
      console.log(res)
      this.workers = res?.data;
      this.dataSource.data = res?.data
    })
  }

  inviteWorker() {
    const activeModal = this.modalService.open(ManageWorkerInviteWorkersModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.timesheetid = this.timesheet?.timesheet_id
    activeModal.componentInstance.fetchWorkerData = this.fetchWorkerData.bind(this)

  }

  updatePlannedHours(worker_id, planned_hours) {
    let data = {
      workerId: worker_id,
      planned_hours: planned_hours
    }
    this.timesheetService.updateLocalWorker(data).subscribe(res => {
      console.log(res)
    })
  }

  updateStatus(worker_id, status) {
    console.log(worker_id, status)
    let data = {
      workerId: worker_id,
      status: status
    }
    this.timesheetService.updateLocalWorker(data).subscribe(res => {
      console.log(res)
    })
  }
}
