import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TimesheetService } from 'src/app/shared/services/public-api';

export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  status: boolean;
  plannedHours: number;
  totalHours: number;
  approvedHours: number;
  rejectedHours: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() timesheetid;
  @Input() timesheet;
  timesheetdata;
  workers;

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours', 'total_hours', 'approved_hours', 'rejected_hours'];

  constructor(
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let id = res?.data.timesheet_id
      console.log("this.timesheetid worker" + JSON.stringify(this.timesheetdata))
      this.timesheetService.getTimesheetWorkerSummary(id).subscribe(res => {
        this.workers = res?.data;;
        this.workers = this.workers.map((worker) => {
          console.log(worker.attendance)
          if (worker?.attendance != null) {
            worker.total_hours = worker?.attendance.total_hours
            worker.approved_hours =worker?.attendance.total_hours_approve
            worker.rejected_hours = worker?.attendance .total_hours_disapprove
          } else {
            worker.total_hours = 0
            worker.approved_hours = 0
            worker.rejected_hours = 0
          }
          return worker
        })
        console.log(this.workers)
        this.dataSource.data = this.workers
      })
    })
  }

}

