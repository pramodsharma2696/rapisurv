import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { ManageWorkerAssignWorkerModalComponent } from '../manage-worker-assign-worker-modal/manage-worker-assign-worker-modal.component';
import { MatPaginator } from '@angular/material/paginator';

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
export class ManageWorkerComponent implements OnInit, AfterViewInit {
  @Input() timesheetid;
  @Input() timesheet;
  timesheetdata;
  workers;
  isAssignwork: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours'];

  constructor(
    private modalService: NgbModal,
    private timesheetService: TimesheetService

  ) { }


  ngOnInit(): void {
    this.isAssignwork = false
    console.log("this.timesheetid worker" + this.timesheetid)
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let id = res?.data.timesheet_id
      this.isAssignwork = res.data.assign_task == '1'
      if (this.isAssignwork) {
        this.displayedColumns = [...this.displayedColumns, 'work_assignment', 'assign_work']
      } else {
        this.displayedColumns = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours']
      }
      console.log("assigned task status>>>>>>" + res.data.assign_task)
      console.log("this.timesheetid worker" + JSON.stringify(this.timesheetdata))
      this.timesheetService.getTimesheetLocalWorker(id).subscribe(res => {
        this.workers = res?.data;;
        this.workers = this.workers.map((worker) => {
          if (worker.work_assignment)
            worker.work_assignment = JSON.parse(worker.work_assignment)
          return worker
        })
        console.log(this.workers)
        this.dataSource.data = this.workers
      })
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  updateAssignWork(worker_id, assignedWork) {
    console.log(worker_id, assignedWork)
    let data = {
      workerId: worker_id,
      work_assignment: assignedWork
    }
    this.timesheetService.updateLocalWorker(data).subscribe(res => {
      console.log(res)
      this.timesheetService.getTimesheetLocalWorker(this.timesheetdata.timesheet_id).subscribe(res => {
        this.workers = res?.data;;
        this.workers = this.workers.map((worker) => {
          if (worker.work_assignment)
            worker.work_assignment = JSON.parse(worker.work_assignment)
          return worker
        })
        console.log(this.workers)
        this.dataSource.data = this.workers
      })
    })
  }

  onClickAssignWork() {
    console.log(this.isAssignwork)
    this.timesheetService.setAssignedTaskStatus(this.timesheetdata.timesheet_id).subscribe(res => {
      console.log(res)
    })
    if (this.isAssignwork) {
      this.displayedColumns = [...this.displayedColumns, 'work_assignment', 'assign_work']
    } else {
      this.displayedColumns = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours']
    }
  }

  assignWork(worker_id) {
    const activeModal = this.modalService.open(ManageWorkerAssignWorkerModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.worker_id = worker_id
    activeModal.componentInstance.updateAssignWork = this.updateAssignWork.bind(this)
  }
}
